/**
 * Original version: https://github.com/denilsonsa/html5-knob
 * Converted to Custom Elements API.
 */

// Convenience functions to sanitize numbers.
let float_or_default = function(x, def) {
	x = parseFloat(x);
	return isNaN(x) ? def : x;
};
let int_or_default = function(x, def) {
	x = parseInt(x, 10);
	return isNaN(x) ? def : x;
};

////////////////////
// Global internal variables for UI handling.

// A XKnob element if one is being dragged right now.
//
// Limitation: only one can be changed at the same time.
//
// This limitation is not a problem on mouse-driven interfaces, as
// there is only a single mouse (well, on most systems anyway).
//
// For multi-touch interfaces, this code should be rewritten to support
// multiple knobs being changed at the same time.
let xknob_being_dragged = null;

// The mouse (or touch) angle from the last event. Used to calculate
// the direction (CW or CCW).
let xknob_drag_previous_angle = null;

// The (proposed, before applying min/max/divisions) value from the
// last event.
let xknob_drag_previous_value = 0;

// The initial value upon starting to drag the knob. Used to decide if
// 'change' event should be fired.
let xknob_drag_initial_value = 0;

////////////////////
// Event handling functions.

const add_listeners_to_document = function(elem) {
	if (elem instanceof HTMLElement) {
		elem = elem.ownerDocument;
	}
	// Duplicate event listeners are discarded.
	elem.addEventListener("mouseup", stop_dragging);
	elem.addEventListener("mousemove", drag_rotate);
	elem.addEventListener("touchend", stop_dragging);
	elem.addEventListener("touchmove", drag_rotate);
};
const remove_listeners_from_document = function(elem) {
	if (elem instanceof HTMLElement) {
		elem = elem.ownerDocument;
	}
	elem.removeEventListener("mouseup", stop_dragging);
	elem.removeEventListener("mousemove", drag_rotate);
	elem.removeEventListener("touchend", stop_dragging);
	elem.removeEventListener("touchmove", drag_rotate);
};

// Should be attached to '.knob_gfx'.
const start_dragging = function(ev) {
	remove_listeners_from_document(ev.target);
	xknob_being_dragged = null;

	// Only handling clicks with the left mouse button.
	if (ev.type === "mousedown" && ev.button !== 0) {
		return;
	}

	// Finding the XKnob element.
	// ev.target is where the event was originated.
	// ev.currentTarget is where the event listener was attached.
	let shadow_root = ev.currentTarget;
	while (shadow_root && !(shadow_root instanceof ShadowRoot)) {
		shadow_root = shadow_root.parentNode;
	}
	if (!shadow_root) return;
	let dial = shadow_root.host;
	if (!dial) return;

	// No reaction if the element is disabled or readonly.
	if (dial.disabled || dial.readonly) {
		// Should we call preventDefault/stopPropagation here?
		return;
	}

	// Actual event handling.
	ev.preventDefault();
	ev.stopPropagation();
	xknob_being_dragged = dial;
	xknob_drag_previous_angle = dial._get_mouse_angle(ev);
	xknob_drag_previous_value = dial.value;
	xknob_drag_initial_value = dial.value;

	add_listeners_to_document(dial);

	// Giving the element focus to enable keyboard events.
	// We need to do this here because we called preventDefault() and
	// stopPropagation().
	dial.focus();
};

// Should be attached to the document, because this event may happen
// outside of XKnob.
const stop_dragging = function(ev) {
	if (!xknob_being_dragged) {
		remove_listeners_from_document(ev.target);
		return;
	}

	if (xknob_being_dragged.disabled || xknob_being_dragged.readonly) {
		remove_listeners_from_document(ev.target);
		return;
	}

	if (xknob_drag_initial_value !== xknob_being_dragged.value) {
		xknob_being_dragged.dispatchEvent(
			new Event("change", {
				bubbles: true,
				cancelable: false
			})
		);
	}

	remove_listeners_from_document(ev.target);
	xknob_being_dragged = null;
};

// Should be attached to the document, because this event may happen
// outside of XKnob.
const drag_rotate = function(ev) {
	if (!xknob_being_dragged) {
		remove_listeners_from_document(ev.target);
		return;
	}

	if (xknob_being_dragged.disabled || xknob_being_dragged.readonly) {
		remove_listeners_from_document(ev.target);
		return;
	}

	let new_angle = xknob_being_dragged._get_mouse_angle(ev);
	let old_angle = xknob_drag_previous_angle;
	xknob_drag_previous_angle = new_angle;

	let delta_angle = new_angle - old_angle;
	if (delta_angle < 0) {
		// Because this is a circle
		delta_angle += Math.PI * 2;
	}
	if (delta_angle > Math.PI) {
		// Converting from 0..360 to -180..180.
		delta_angle -= Math.PI * 2;
	}
	console.assert(delta_angle >= -Math.PI && delta_angle <= Math.PI, {
		delta_angle: delta_angle,
		old_angle: old_angle,
		new_angle: new_angle
	});

	let delta_value = delta_angle / Math.PI / 2;
	let new_proposed_value = xknob_drag_previous_value + delta_value;
	let old_actual_value = xknob_being_dragged.value;

	xknob_being_dragged.value = new_proposed_value;

	// The .value setter changes the xknob_drag_previous_value variable
	// (in case the setter was implicitly called by the user).
	// Here, however, we need xknob_drag_previous_value set to this
	// specific value, so we overwrite it.
	xknob_drag_previous_value = new_proposed_value;

	let new_actual_value = xknob_being_dragged.value;
	if (old_actual_value !== new_actual_value) {
		xknob_being_dragged.dispatchEvent(
			new Event("input", {
				bubbles: true,
				cancelable: false
			})
		);
	}
};

// Keyboard support when receiving focus.
const keypress_handler = function(ev) {
	if (ev.target.disabled) {
		return;
	}

	// Some constants.
	const STEP_SIZE_SMALL = 1; // For Arrows.
	const STEP_SIZE_MEDIUM = 2; // For PageUp/PageDown.
	const STEP_SIZE_EXTREME = 3; // For Home/End.

	let step_size = null;
	let step_direction = null;

	// ev.code and ev.key are new to DOM 3 Events:
	// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
	// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key

	// If I remap my keyboard (e.g. I've remapped Caps Lock to be
	// Escape), then ev.key shows the remapped value (e.g. Escape),
	// while ev.code shows the actual physical key (e.g. Caps Lock).
	//
	// Also, if NumLock is off, numpad keys return their alternate
	// value in ev.key (e.g. ArrowUp), and the actual physical key in
	// ev.code (e.g. Numpad8).
	//
	// For this component, ev.key makes more sense than ev.code, as we
	// are interested in the logical value/action, and not the physical
	// key location.

	switch (ev.key) {
		// The same direction/orientation as <input type="range">.
		case "Home":
		case "PageDown":
		case "ArrowLeft":
		case "ArrowDown":
			step_direction = -1;
			break;
		case "End":
		case "PageUp":
		case "ArrowRight":
		case "ArrowUp":
			step_direction = +1;
			break;
		default:
			return;
	}
	switch (ev.key) {
		case "Home":
		case "End":
			step_size = STEP_SIZE_EXTREME;
			break;
		case "PageUp":
		case "PageDown":
			step_size = STEP_SIZE_MEDIUM;
			break;
		case "ArrowRight":
		case "ArrowLeft":
		case "ArrowDown":
		case "ArrowUp":
			step_size = STEP_SIZE_SMALL;
			break;
		default:
			return;
	}

	// Sanity check.
	if (step_size === null || step_direction === null) {
		console.error(
			"This should not happen! step_size=" +
				step_size +
				", step_direction=" +
				step_direction
		);
		return;
	}

	ev.preventDefault();
	//ev.stopPropagation();

	// Read-only will receive and process the events, but won't change
	// the value.
	if (ev.target.readonly) {
		return;
	}

	let initial_value = ev.target.value;
	let divisions = ev.target.divisions;
	let step;

	if (step_size === STEP_SIZE_EXTREME) {
		if (step_direction < 0) {
			if (ev.target.min !== null) {
				ev.target.value = ev.target.min;
			}
		} else if (step_direction > 0) {
			if (ev.target.max !== null) {
				ev.target.value = ev.target.max;
			}
		}
	} else if (step_size === STEP_SIZE_MEDIUM) {
		step = 1.0 / 8;
		// Finding a step amount near 45deg:
		if (divisions >= 2) {
			step = Math.round(step * divisions) / divisions;
			// In case the previous expression evaluated to zero.
			step = Math.max(step, 1.0 / divisions);
		}
		ev.target.value += step * step_direction;
	} else if (step_size === STEP_SIZE_SMALL) {
		step = 1.0 / 64;
		if (divisions >= 2) {
			step = 1.0 / divisions;
		}
		ev.target.value += step * step_direction;
	} else {
		console.error(
			"This should not happen! Unknown step_size: " + step_size
		);
	}

	if (initial_value !== ev.target.value) {
		ev.target.dispatchEvent(
			new Event("input", {
				bubbles: true,
				cancelable: false
			})
		);
		ev.target.dispatchEvent(
			new Event("change", {
				bubbles: true,
				cancelable: false
			})
		);

		// Trying to improve the corner-case of someone dragging the
		// control at same time as using keyboard.
		if (xknob_being_dragged) {
			xknob_drag_initial_value = ev.target.value;
		}
	}
};
class Dial extends HTMLElement {
	constructor() {
		super();
		// Specs also mention 'beforeinput' event, but it is
		// not implemented in browsers, and I don't see why it
		// would be better than 'keydown'.
		this.addEventListener("keydown", keypress_handler);
		// Note: 'keypress' event does not work.
	}

	connectedCallback() {
		this._update_innerHTML();
	}

	attributeChangedCallback(attrName, oldVal, newVal) {
		attrName = attrName.toLowerCase();
		if (
			["divisions", "min", "max", "svgsymbolid", "value"].indexOf(
				attrName
			) > -1
		) {
			this[attrName] = newVal;
		} else if (["disabled", "readonly"].indexOf(attrName) > -1) {
			if (newVal === null) {
				// Attribute has been removed.
				this[attrName] = false;
			} else {
				this[attrName] = true;
			}
		}
	}

	// HTMLInputElement-inspired properties.
	// Upon getting, returns a number (or null) instead of a string!
	get disabled() {
		return this.getAttribute("disabled");
	}
	set disabled(x) {
		this.setAttribute("disabled", x);
	}

	get readonly() {
		return this.getAttribute("readonly");
	}
	set readonly(x) {
		this.setAttribute("disabled", !!x);
	}

	get divisions() {
		return this.getAttribute("divisions");
	}

	set divisions(x) {
		let _divisions = int_or_default(x, 0);
		this._update_value();
		this.setAttribute("divisions", _divisions);
	}

	get min() {
		return float_or_default(this.getAttribute("min"));
	}
	set min(x) {
		let _min = float_or_default(x, null);
		this._update_value();
		this.setAttribute("min", _min);
	}

	get max() {
		return float_or_default(this.getAttribute("max"));
	}
	set max(x) {
		let _max = float_or_default(x, null);
		this._update_value();
		this.setAttribute("max", _max);
	}

	get svgsymbolid() {
		return this.getAttribute("svgsymbolid");
	}
	set svgsymbolid(x) {
		x = "" + x; // Forcing conversion to string.
		// https://stackoverflow.com/questions/70579/what-are-valid-values-for-the-id-attribute-in-html
		// http://www.w3.org/TR/html4/types.html#type-id
		if (/^[A-Za-z][-A-Za-z0-9_:.]*$/.test(x)) {
			this.setAttribute("svgsymbolid", x);
		} else {
			this.removeAttribute("svgsymbolid");
		}
		this._update_innerHTML();
	}

	get value() {
		return float_or_default(this.getAttribute("value"));
	}
	set value(x) {
		let value = float_or_default(x, 0);
		value = this._update_value(value);
		this.setAttribute("value", value);
	}

	_update_innerHTML() {
		if (!this.shadowRoot) {
			this.attachShadow({ mode: "open" });
		}

		let symbol = null;
		if (this.svgsymbolid) {
			symbol = this.ownerDocument.getElementById(this.svgsymbolid);
			if (symbol && symbol.tagName.toLowerCase() === "symbol") {
				symbol = symbol.cloneNode(true);
			} else {
				symbol = null;
			}
		}
		let id = "default_x-knob_gfx";
		if (symbol) {
			id = symbol.getAttribute("id");
		}

		this.shadowRoot.innerHTML = `
			<svg viewBox="-1 -1 2 2" style="display: block; width: 100%; height: 100%; pointer-events: none;">
				<defs></defs>
				<circle class="knob_center" cx="0" cy="0" r="0.0078125" fill="none" opacity="0" pointer-events="none"/>
				<use class="knob_gfx" xlink:href="#${id}" x="-1" y="-1" width="2" height="2" style="pointer-events: auto; -webkit-touch-callout: none; user-select: none;"/>
			</svg>
			`;

		if (symbol) {
			this.shadowRoot.querySelector("defs").appendChild(symbol);
		} else {
			this.shadowRoot.querySelector("defs").innerHTML = `
				<symbol id="default_x-knob_gfx" viewBox="-6 -6 12 12">
					<circle cx="0" cy="0" r="5.875" stroke="#2e3436" fill="#babdb6" stroke-width="0.25"/>
					<line x1="0" y1="-1.5" x2="0" y2="-4.75" stroke="#2e3436" stroke-width="0.5px" stroke-linecap="round"/>
				</symbol>`;
		}

		this.shadowRoot
			.querySelector(".knob_gfx")
			.addEventListener("mousedown", start_dragging);
		this.shadowRoot
			.querySelector(".knob_gfx")
			.addEventListener("touchstart", start_dragging);
		this._update_gfx_rotation();
	}

	_update_value(v) {
		// Sanity check.
		if (!Number.isFinite(v)) {
			v = 0;
		}

		// Snapping to one of the circle divisions.
		if (Number.isFinite(this.divisions) && this.divisions >= 2) {
			v = Math.round(this.value * this.divisions) / this.divisions;
		}

		// Clamping to the defined min..max range.
		if (Number.isFinite(this.max) && this.value > this.max) {
			v = this.max;
		}
		if (Number.isFinite(this.min) && this.value < this.min) {
			v = this.min;
		}

		// If the element being dragged had .value updated by the user.
		//
		// Note: This may cause drifting, may cause the knob
		// moving a further away or behind the cursor. The only
		// way to avoid drifting is by NOT updating .value
		// while the control is being dragged.
		if (this === xknob_being_dragged) {
			// Please also read the comment inside drag_rotate() function.
			xknob_drag_previous_value = this.value;
		}

		this._update_gfx_rotation();

		return v;
	}

	_update_gfx_rotation() {
		if (this.shadowRoot) {
			let elem = this.shadowRoot.querySelector(".knob_gfx");
			if (elem) {
				elem.style.transform = "rotate(" + this.value * 360 + "deg)";
			}
		}
	}

	_get_center_position() {
		// Invisible element used to get the X,Y coordinates.
		let rect = this.shadowRoot
			.querySelector(".knob_center")
			.getBoundingClientRect();
		return [
			rect.left + (rect.right - rect.left) / 2,
			rect.top + (rect.bottom - rect.top) / 2
		];
	}

	_get_mouse_angle(ev) {
		let center = this._get_center_position();

		// Mouse position.
		let cursor = [ev.clientX, ev.clientY];

		// Or finger touch position.
		if (ev.targetTouches && ev.targetTouches[0]) {
			cursor = [ev.targetTouches[0].clientX, ev.targetTouches[0].clientY];
		}

		let rad = Math.atan2(cursor[1] - center[1], cursor[0] - center[0]);
		rad += Math.PI / 2;

		return rad;
	}
}

window.customElements.define("x-dial", Dial);
