(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    class DaysBetweenDates {
        constructor(selector, option) {
            this.$el = document.querySelector(selector);
            this.startDate = option.startDate;
            this.endDate = option.endDate;
            this.includingFirstDay = option.includingFirstDay;
            this.includingLastDay = option.includingLastDay;
            if ("current" !== this.endDate) {
                const endDateArr = this.endDate.split(".");
                this.liveD = Number(endDateArr[0]);
                this.liveM = Number(endDateArr[1]);
                this.liveY = Number(endDateArr[2]);
            } else {
                this.liveY = (new Date).getFullYear();
                this.liveM = (new Date).getMonth() + 1;
                this.liveD = (new Date).getDate();
            }
            this.arrMonths = [];
            this.clearArrM = [];
            this.arrMinusZeroM = [];
            this.lastD = 0;
            this.firstD = 0;
            this.calcDays = 0;
            this.calcMonths = 0;
            this.calcYear = 0;
            this.daysAllCount();
            this.editMStartEnd();
            this.editDStartEnd();
            this.countDMY();
        }
        startDateEnter(mod) {
            if (10 === this.startDate.length) switch (mod) {
              case "D":
                return this.startDate.split(".").map(Number)[0];
                break;

              case "M":
                return this.startDate.split(".").map(Number)[1];
                break;

              case "Y":
                return this.startDate.split(".").map(Number)[2];
                break;
            } else return false;
        }
        calendarGen(year) {
            const daysArray = [];
            for (let i = 0; i < 12; i++) {
                const daysInMonth = new Date(year, i + 1, 0).getDate();
                daysArray.push(daysInMonth);
            }
            return daysArray;
        }
        daysAllCount() {
            for (let iYears = this.startDateEnter("Y"); iYears <= this.liveY; iYears++) this.arrMonths = this.arrMonths.concat(this.calendarGen(iYears));
 //! makes all the arrays of the calendar of years at one massif (all days of months at one massif)
                }
        editMStartEnd() {
            let count = null;
            this.arrMonths = this.arrMonths.map((e => {
                count += 1;
                if (count < this.startDateEnter("M")) return e = 0;
                if (count > this.arrMonths.length - 12 + this.liveM) return e = 0;
                if (0 !== e) {
                    this.clearArrM.push(e);
                    this.arrMinusZeroM.push(e);
                }
                return e;
            }));
            this.firstOriginM = this.clearArrM[0];
            this.lastOriginM = this.clearArrM[this.clearArrM.length - 1];
        }
        editDStartEnd() {
            if (true === this.includingLastDay) this.clearArrM[this.clearArrM.length - 1] = this.liveD; else this.clearArrM[this.clearArrM.length - 1] = this.liveD - 1;
            if (true === this.includingFirstDay) this.clearArrM[0] = this.clearArrM[0] - this.startDateEnter("D") + 1; else this.clearArrM[0] = this.clearArrM[0] - this.startDateEnter("D");
            this.lastD = this.clearArrM[this.clearArrM.length - 1];
            this.firstD = this.clearArrM[0];
        }
        totalDays() {
            let days = null;
            this.clearArrM.forEach((e => {
                days += e;
            }));
            return days;
        }
        countDMY() {
            for (let i = 0; i <= this.clearArrM.length - 1; i++) if (this.clearArrM[i] === this.arrMinusZeroM[i]) this.calcMonths += 1; else if (this.clearArrM[i] !== this.arrMinusZeroM[i]) this.calcDays += this.clearArrM[i];
            if (this.calcDays >= this.firstOriginM) {
                this.calcDays -= this.firstOriginM;
                this.calcMonths += 1;
            }
            if (this.calcMonths >= 12) {
                this.calcYear = Math.floor(this.calcMonths / 12);
                this.calcMonths -= 12 * this.calcYear;
            }
        }
        errorMessage() {
            this.startDateStr = `${this.startDateEnter("D")}.${this.startDateEnter("M")}.${this.startDateEnter("Y")}`;
            this.endDateStr = `${this.liveD}.${this.liveM}.${this.liveY}`;
            if (this.totalDays() <= 0 || isNaN(this.totalDays())) return false;
        }
    }
    var defaultInstanceSettings = {
        update: null,
        begin: null,
        loopBegin: null,
        changeBegin: null,
        change: null,
        changeComplete: null,
        loopComplete: null,
        complete: null,
        loop: 1,
        direction: "normal",
        autoplay: true,
        timelineOffset: 0
    };
    var defaultTweenSettings = {
        duration: 1e3,
        delay: 0,
        endDelay: 0,
        easing: "easeOutElastic(1, .5)",
        round: 0
    };
    var validTransforms = [ "translateX", "translateY", "translateZ", "rotate", "rotateX", "rotateY", "rotateZ", "scale", "scaleX", "scaleY", "scaleZ", "skew", "skewX", "skewY", "perspective", "matrix", "matrix3d" ];
    var cache = {
        CSS: {},
        springs: {}
    };
    function minMax(val, min, max) {
        return Math.min(Math.max(val, min), max);
    }
    function stringContains(str, text) {
        return str.indexOf(text) > -1;
    }
    function applyArguments(func, args) {
        return func.apply(null, args);
    }
    var is = {
        arr: function(a) {
            return Array.isArray(a);
        },
        obj: function(a) {
            return stringContains(Object.prototype.toString.call(a), "Object");
        },
        pth: function(a) {
            return is.obj(a) && a.hasOwnProperty("totalLength");
        },
        svg: function(a) {
            return a instanceof SVGElement;
        },
        inp: function(a) {
            return a instanceof HTMLInputElement;
        },
        dom: function(a) {
            return a.nodeType || is.svg(a);
        },
        str: function(a) {
            return "string" === typeof a;
        },
        fnc: function(a) {
            return "function" === typeof a;
        },
        und: function(a) {
            return "undefined" === typeof a;
        },
        nil: function(a) {
            return is.und(a) || null === a;
        },
        hex: function(a) {
            return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a);
        },
        rgb: function(a) {
            return /^rgb/.test(a);
        },
        hsl: function(a) {
            return /^hsl/.test(a);
        },
        col: function(a) {
            return is.hex(a) || is.rgb(a) || is.hsl(a);
        },
        key: function(a) {
            return !defaultInstanceSettings.hasOwnProperty(a) && !defaultTweenSettings.hasOwnProperty(a) && "targets" !== a && "keyframes" !== a;
        }
    };
    function parseEasingParameters(string) {
        var match = /\(([^)]+)\)/.exec(string);
        return match ? match[1].split(",").map((function(p) {
            return parseFloat(p);
        })) : [];
    }
    function spring(string, duration) {
        var params = parseEasingParameters(string);
        var mass = minMax(is.und(params[0]) ? 1 : params[0], .1, 100);
        var stiffness = minMax(is.und(params[1]) ? 100 : params[1], .1, 100);
        var damping = minMax(is.und(params[2]) ? 10 : params[2], .1, 100);
        var velocity = minMax(is.und(params[3]) ? 0 : params[3], .1, 100);
        var w0 = Math.sqrt(stiffness / mass);
        var zeta = damping / (2 * Math.sqrt(stiffness * mass));
        var wd = zeta < 1 ? w0 * Math.sqrt(1 - zeta * zeta) : 0;
        var a = 1;
        var b = zeta < 1 ? (zeta * w0 + -velocity) / wd : -velocity + w0;
        function solver(t) {
            var progress = duration ? duration * t / 1e3 : t;
            if (zeta < 1) progress = Math.exp(-progress * zeta * w0) * (a * Math.cos(wd * progress) + b * Math.sin(wd * progress)); else progress = (a + b * progress) * Math.exp(-progress * w0);
            if (0 === t || 1 === t) return t;
            return 1 - progress;
        }
        function getDuration() {
            var cached = cache.springs[string];
            if (cached) return cached;
            var frame = 1 / 6;
            var elapsed = 0;
            var rest = 0;
            while (true) {
                elapsed += frame;
                if (1 === solver(elapsed)) {
                    rest++;
                    if (rest >= 16) break;
                } else rest = 0;
            }
            var duration = elapsed * frame * 1e3;
            cache.springs[string] = duration;
            return duration;
        }
        return duration ? solver : getDuration;
    }
    function steps(steps) {
        if (void 0 === steps) steps = 10;
        return function(t) {
            return Math.ceil(minMax(t, 1e-6, 1) * steps) * (1 / steps);
        };
    }
    var bezier = function() {
        var kSplineTableSize = 11;
        var kSampleStepSize = 1 / (kSplineTableSize - 1);
        function A(aA1, aA2) {
            return 1 - 3 * aA2 + 3 * aA1;
        }
        function B(aA1, aA2) {
            return 3 * aA2 - 6 * aA1;
        }
        function C(aA1) {
            return 3 * aA1;
        }
        function calcBezier(aT, aA1, aA2) {
            return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
        }
        function getSlope(aT, aA1, aA2) {
            return 3 * A(aA1, aA2) * aT * aT + 2 * B(aA1, aA2) * aT + C(aA1);
        }
        function binarySubdivide(aX, aA, aB, mX1, mX2) {
            var currentX, currentT, i = 0;
            do {
                currentT = aA + (aB - aA) / 2;
                currentX = calcBezier(currentT, mX1, mX2) - aX;
                if (currentX > 0) aB = currentT; else aA = currentT;
            } while (Math.abs(currentX) > 1e-7 && ++i < 10);
            return currentT;
        }
        function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
            for (var i = 0; i < 4; ++i) {
                var currentSlope = getSlope(aGuessT, mX1, mX2);
                if (0 === currentSlope) return aGuessT;
                var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
                aGuessT -= currentX / currentSlope;
            }
            return aGuessT;
        }
        function bezier(mX1, mY1, mX2, mY2) {
            if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) return;
            var sampleValues = new Float32Array(kSplineTableSize);
            if (mX1 !== mY1 || mX2 !== mY2) for (var i = 0; i < kSplineTableSize; ++i) sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
            function getTForX(aX) {
                var intervalStart = 0;
                var currentSample = 1;
                var lastSample = kSplineTableSize - 1;
                for (;currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) intervalStart += kSampleStepSize;
                --currentSample;
                var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
                var guessForT = intervalStart + dist * kSampleStepSize;
                var initialSlope = getSlope(guessForT, mX1, mX2);
                if (initialSlope >= .001) return newtonRaphsonIterate(aX, guessForT, mX1, mX2); else if (0 === initialSlope) return guessForT; else return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
            }
            return function(x) {
                if (mX1 === mY1 && mX2 === mY2) return x;
                if (0 === x || 1 === x) return x;
                return calcBezier(getTForX(x), mY1, mY2);
            };
        }
        return bezier;
    }();
    var penner = function() {
        var eases = {
            linear: function() {
                return function(t) {
                    return t;
                };
            }
        };
        var functionEasings = {
            Sine: function() {
                return function(t) {
                    return 1 - Math.cos(t * Math.PI / 2);
                };
            },
            Circ: function() {
                return function(t) {
                    return 1 - Math.sqrt(1 - t * t);
                };
            },
            Back: function() {
                return function(t) {
                    return t * t * (3 * t - 2);
                };
            },
            Bounce: function() {
                return function(t) {
                    var pow2, b = 4;
                    while (t < ((pow2 = Math.pow(2, --b)) - 1) / 11) ;
                    return 1 / Math.pow(4, 3 - b) - 7.5625 * Math.pow((3 * pow2 - 2) / 22 - t, 2);
                };
            },
            Elastic: function(amplitude, period) {
                if (void 0 === amplitude) amplitude = 1;
                if (void 0 === period) period = .5;
                var a = minMax(amplitude, 1, 10);
                var p = minMax(period, .1, 2);
                return function(t) {
                    return 0 === t || 1 === t ? t : -a * Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1 - p / (2 * Math.PI) * Math.asin(1 / a)) * (2 * Math.PI) / p);
                };
            }
        };
        var baseEasings = [ "Quad", "Cubic", "Quart", "Quint", "Expo" ];
        baseEasings.forEach((function(name, i) {
            functionEasings[name] = function() {
                return function(t) {
                    return Math.pow(t, i + 2);
                };
            };
        }));
        Object.keys(functionEasings).forEach((function(name) {
            var easeIn = functionEasings[name];
            eases["easeIn" + name] = easeIn;
            eases["easeOut" + name] = function(a, b) {
                return function(t) {
                    return 1 - easeIn(a, b)(1 - t);
                };
            };
            eases["easeInOut" + name] = function(a, b) {
                return function(t) {
                    return t < .5 ? easeIn(a, b)(2 * t) / 2 : 1 - easeIn(a, b)(-2 * t + 2) / 2;
                };
            };
            eases["easeOutIn" + name] = function(a, b) {
                return function(t) {
                    return t < .5 ? (1 - easeIn(a, b)(1 - 2 * t)) / 2 : (easeIn(a, b)(2 * t - 1) + 1) / 2;
                };
            };
        }));
        return eases;
    }();
    function parseEasings(easing, duration) {
        if (is.fnc(easing)) return easing;
        var name = easing.split("(")[0];
        var ease = penner[name];
        var args = parseEasingParameters(easing);
        switch (name) {
          case "spring":
            return spring(easing, duration);

          case "cubicBezier":
            return applyArguments(bezier, args);

          case "steps":
            return applyArguments(steps, args);

          default:
            return applyArguments(ease, args);
        }
    }
    function selectString(str) {
        try {
            var nodes = document.querySelectorAll(str);
            return nodes;
        } catch (e) {
            return;
        }
    }
    function filterArray(arr, callback) {
        var len = arr.length;
        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        var result = [];
        for (var i = 0; i < len; i++) if (i in arr) {
            var val = arr[i];
            if (callback.call(thisArg, val, i, arr)) result.push(val);
        }
        return result;
    }
    function flattenArray(arr) {
        return arr.reduce((function(a, b) {
            return a.concat(is.arr(b) ? flattenArray(b) : b);
        }), []);
    }
    function toArray(o) {
        if (is.arr(o)) return o;
        if (is.str(o)) o = selectString(o) || o;
        if (o instanceof NodeList || o instanceof HTMLCollection) return [].slice.call(o);
        return [ o ];
    }
    function arrayContains(arr, val) {
        return arr.some((function(a) {
            return a === val;
        }));
    }
    function cloneObject(o) {
        var clone = {};
        for (var p in o) clone[p] = o[p];
        return clone;
    }
    function replaceObjectProps(o1, o2) {
        var o = cloneObject(o1);
        for (var p in o1) o[p] = o2.hasOwnProperty(p) ? o2[p] : o1[p];
        return o;
    }
    function mergeObjects(o1, o2) {
        var o = cloneObject(o1);
        for (var p in o2) o[p] = is.und(o1[p]) ? o2[p] : o1[p];
        return o;
    }
    function rgbToRgba(rgbValue) {
        var rgb = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(rgbValue);
        return rgb ? "rgba(" + rgb[1] + ",1)" : rgbValue;
    }
    function hexToRgba(hexValue) {
        var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        var hex = hexValue.replace(rgx, (function(m, r, g, b) {
            return r + r + g + g + b + b;
        }));
        var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        var r = parseInt(rgb[1], 16);
        var g = parseInt(rgb[2], 16);
        var b = parseInt(rgb[3], 16);
        return "rgba(" + r + "," + g + "," + b + ",1)";
    }
    function hslToRgba(hslValue) {
        var hsl = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hslValue) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(hslValue);
        var h = parseInt(hsl[1], 10) / 360;
        var s = parseInt(hsl[2], 10) / 100;
        var l = parseInt(hsl[3], 10) / 100;
        var a = hsl[4] || 1;
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + 6 * (q - p) * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }
        var r, g, b;
        if (0 == s) r = g = b = l; else {
            var q = l < .5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        return "rgba(" + 255 * r + "," + 255 * g + "," + 255 * b + "," + a + ")";
    }
    function colorToRgb(val) {
        if (is.rgb(val)) return rgbToRgba(val);
        if (is.hex(val)) return hexToRgba(val);
        if (is.hsl(val)) return hslToRgba(val);
    }
    function getUnit(val) {
        var split = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(val);
        if (split) return split[1];
    }
    function getTransformUnit(propName) {
        if (stringContains(propName, "translate") || "perspective" === propName) return "px";
        if (stringContains(propName, "rotate") || stringContains(propName, "skew")) return "deg";
    }
    function getFunctionValue(val, animatable) {
        if (!is.fnc(val)) return val;
        return val(animatable.target, animatable.id, animatable.total);
    }
    function getAttribute(el, prop) {
        return el.getAttribute(prop);
    }
    function convertPxToUnit(el, value, unit) {
        var valueUnit = getUnit(value);
        if (arrayContains([ unit, "deg", "rad", "turn" ], valueUnit)) return value;
        var cached = cache.CSS[value + unit];
        if (!is.und(cached)) return cached;
        var baseline = 100;
        var tempEl = document.createElement(el.tagName);
        var parentEl = el.parentNode && el.parentNode !== document ? el.parentNode : document.body;
        parentEl.appendChild(tempEl);
        tempEl.style.position = "absolute";
        tempEl.style.width = baseline + unit;
        var factor = baseline / tempEl.offsetWidth;
        parentEl.removeChild(tempEl);
        var convertedUnit = factor * parseFloat(value);
        cache.CSS[value + unit] = convertedUnit;
        return convertedUnit;
    }
    function getCSSValue(el, prop, unit) {
        if (prop in el.style) {
            var uppercasePropName = prop.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
            var value = el.style[prop] || getComputedStyle(el).getPropertyValue(uppercasePropName) || "0";
            return unit ? convertPxToUnit(el, value, unit) : value;
        }
    }
    function getAnimationType(el, prop) {
        if (is.dom(el) && !is.inp(el) && (!is.nil(getAttribute(el, prop)) || is.svg(el) && el[prop])) return "attribute";
        if (is.dom(el) && arrayContains(validTransforms, prop)) return "transform";
        if (is.dom(el) && "transform" !== prop && getCSSValue(el, prop)) return "css";
        if (null != el[prop]) return "object";
    }
    function getElementTransforms(el) {
        if (!is.dom(el)) return;
        var str = el.style.transform || "";
        var reg = /(\w+)\(([^)]*)\)/g;
        var transforms = new Map;
        var m;
        while (m = reg.exec(str)) transforms.set(m[1], m[2]);
        return transforms;
    }
    function getTransformValue(el, propName, animatable, unit) {
        var defaultVal = stringContains(propName, "scale") ? 1 : 0 + getTransformUnit(propName);
        var value = getElementTransforms(el).get(propName) || defaultVal;
        if (animatable) {
            animatable.transforms.list.set(propName, value);
            animatable.transforms["last"] = propName;
        }
        return unit ? convertPxToUnit(el, value, unit) : value;
    }
    function getOriginalTargetValue(target, propName, unit, animatable) {
        switch (getAnimationType(target, propName)) {
          case "transform":
            return getTransformValue(target, propName, animatable, unit);

          case "css":
            return getCSSValue(target, propName, unit);

          case "attribute":
            return getAttribute(target, propName);

          default:
            return target[propName] || 0;
        }
    }
    function getRelativeValue(to, from) {
        var operator = /^(\*=|\+=|-=)/.exec(to);
        if (!operator) return to;
        var u = getUnit(to) || 0;
        var x = parseFloat(from);
        var y = parseFloat(to.replace(operator[0], ""));
        switch (operator[0][0]) {
          case "+":
            return x + y + u;

          case "-":
            return x - y + u;

          case "*":
            return x * y + u;
        }
    }
    function validateValue(val, unit) {
        if (is.col(val)) return colorToRgb(val);
        if (/\s/g.test(val)) return val;
        var originalUnit = getUnit(val);
        var unitLess = originalUnit ? val.substr(0, val.length - originalUnit.length) : val;
        if (unit) return unitLess + unit;
        return unitLess;
    }
    function getDistance(p1, p2) {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }
    function getCircleLength(el) {
        return 2 * Math.PI * getAttribute(el, "r");
    }
    function getRectLength(el) {
        return 2 * getAttribute(el, "width") + 2 * getAttribute(el, "height");
    }
    function getLineLength(el) {
        return getDistance({
            x: getAttribute(el, "x1"),
            y: getAttribute(el, "y1")
        }, {
            x: getAttribute(el, "x2"),
            y: getAttribute(el, "y2")
        });
    }
    function getPolylineLength(el) {
        var points = el.points;
        var totalLength = 0;
        var previousPos;
        for (var i = 0; i < points.numberOfItems; i++) {
            var currentPos = points.getItem(i);
            if (i > 0) totalLength += getDistance(previousPos, currentPos);
            previousPos = currentPos;
        }
        return totalLength;
    }
    function getPolygonLength(el) {
        var points = el.points;
        return getPolylineLength(el) + getDistance(points.getItem(points.numberOfItems - 1), points.getItem(0));
    }
    function getTotalLength(el) {
        if (el.getTotalLength) return el.getTotalLength();
        switch (el.tagName.toLowerCase()) {
          case "circle":
            return getCircleLength(el);

          case "rect":
            return getRectLength(el);

          case "line":
            return getLineLength(el);

          case "polyline":
            return getPolylineLength(el);

          case "polygon":
            return getPolygonLength(el);
        }
    }
    function setDashoffset(el) {
        var pathLength = getTotalLength(el);
        el.setAttribute("stroke-dasharray", pathLength);
        return pathLength;
    }
    function getParentSvgEl(el) {
        var parentEl = el.parentNode;
        while (is.svg(parentEl)) {
            if (!is.svg(parentEl.parentNode)) break;
            parentEl = parentEl.parentNode;
        }
        return parentEl;
    }
    function getParentSvg(pathEl, svgData) {
        var svg = svgData || {};
        var parentSvgEl = svg.el || getParentSvgEl(pathEl);
        var rect = parentSvgEl.getBoundingClientRect();
        var viewBoxAttr = getAttribute(parentSvgEl, "viewBox");
        var width = rect.width;
        var height = rect.height;
        var viewBox = svg.viewBox || (viewBoxAttr ? viewBoxAttr.split(" ") : [ 0, 0, width, height ]);
        return {
            el: parentSvgEl,
            viewBox,
            x: viewBox[0] / 1,
            y: viewBox[1] / 1,
            w: width,
            h: height,
            vW: viewBox[2],
            vH: viewBox[3]
        };
    }
    function getPath(path, percent) {
        var pathEl = is.str(path) ? selectString(path)[0] : path;
        var p = percent || 100;
        return function(property) {
            return {
                property,
                el: pathEl,
                svg: getParentSvg(pathEl),
                totalLength: getTotalLength(pathEl) * (p / 100)
            };
        };
    }
    function getPathProgress(path, progress, isPathTargetInsideSVG) {
        function point(offset) {
            if (void 0 === offset) offset = 0;
            var l = progress + offset >= 1 ? progress + offset : 0;
            return path.el.getPointAtLength(l);
        }
        var svg = getParentSvg(path.el, path.svg);
        var p = point();
        var p0 = point(-1);
        var p1 = point(+1);
        var scaleX = isPathTargetInsideSVG ? 1 : svg.w / svg.vW;
        var scaleY = isPathTargetInsideSVG ? 1 : svg.h / svg.vH;
        switch (path.property) {
          case "x":
            return (p.x - svg.x) * scaleX;

          case "y":
            return (p.y - svg.y) * scaleY;

          case "angle":
            return 180 * Math.atan2(p1.y - p0.y, p1.x - p0.x) / Math.PI;
        }
    }
    function decomposeValue(val, unit) {
        var rgx = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g;
        var value = validateValue(is.pth(val) ? val.totalLength : val, unit) + "";
        return {
            original: value,
            numbers: value.match(rgx) ? value.match(rgx).map(Number) : [ 0 ],
            strings: is.str(val) || unit ? value.split(rgx) : []
        };
    }
    function parseTargets(targets) {
        var targetsArray = targets ? flattenArray(is.arr(targets) ? targets.map(toArray) : toArray(targets)) : [];
        return filterArray(targetsArray, (function(item, pos, self) {
            return self.indexOf(item) === pos;
        }));
    }
    function getAnimatables(targets) {
        var parsed = parseTargets(targets);
        return parsed.map((function(t, i) {
            return {
                target: t,
                id: i,
                total: parsed.length,
                transforms: {
                    list: getElementTransforms(t)
                }
            };
        }));
    }
    function normalizePropertyTweens(prop, tweenSettings) {
        var settings = cloneObject(tweenSettings);
        if (/^spring/.test(settings.easing)) settings.duration = spring(settings.easing);
        if (is.arr(prop)) {
            var l = prop.length;
            var isFromTo = 2 === l && !is.obj(prop[0]);
            if (!isFromTo) {
                if (!is.fnc(tweenSettings.duration)) settings.duration = tweenSettings.duration / l;
            } else prop = {
                value: prop
            };
        }
        var propArray = is.arr(prop) ? prop : [ prop ];
        return propArray.map((function(v, i) {
            var obj = is.obj(v) && !is.pth(v) ? v : {
                value: v
            };
            if (is.und(obj.delay)) obj.delay = !i ? tweenSettings.delay : 0;
            if (is.und(obj.endDelay)) obj.endDelay = i === propArray.length - 1 ? tweenSettings.endDelay : 0;
            return obj;
        })).map((function(k) {
            return mergeObjects(k, settings);
        }));
    }
    function flattenKeyframes(keyframes) {
        var propertyNames = filterArray(flattenArray(keyframes.map((function(key) {
            return Object.keys(key);
        }))), (function(p) {
            return is.key(p);
        })).reduce((function(a, b) {
            if (a.indexOf(b) < 0) a.push(b);
            return a;
        }), []);
        var properties = {};
        var loop = function(i) {
            var propName = propertyNames[i];
            properties[propName] = keyframes.map((function(key) {
                var newKey = {};
                for (var p in key) if (is.key(p)) {
                    if (p == propName) newKey.value = key[p];
                } else newKey[p] = key[p];
                return newKey;
            }));
        };
        for (var i = 0; i < propertyNames.length; i++) loop(i);
        return properties;
    }
    function getProperties(tweenSettings, params) {
        var properties = [];
        var keyframes = params.keyframes;
        if (keyframes) params = mergeObjects(flattenKeyframes(keyframes), params);
        for (var p in params) if (is.key(p)) properties.push({
            name: p,
            tweens: normalizePropertyTweens(params[p], tweenSettings)
        });
        return properties;
    }
    function normalizeTweenValues(tween, animatable) {
        var t = {};
        for (var p in tween) {
            var value = getFunctionValue(tween[p], animatable);
            if (is.arr(value)) {
                value = value.map((function(v) {
                    return getFunctionValue(v, animatable);
                }));
                if (1 === value.length) value = value[0];
            }
            t[p] = value;
        }
        t.duration = parseFloat(t.duration);
        t.delay = parseFloat(t.delay);
        return t;
    }
    function normalizeTweens(prop, animatable) {
        var previousTween;
        return prop.tweens.map((function(t) {
            var tween = normalizeTweenValues(t, animatable);
            var tweenValue = tween.value;
            var to = is.arr(tweenValue) ? tweenValue[1] : tweenValue;
            var toUnit = getUnit(to);
            var originalValue = getOriginalTargetValue(animatable.target, prop.name, toUnit, animatable);
            var previousValue = previousTween ? previousTween.to.original : originalValue;
            var from = is.arr(tweenValue) ? tweenValue[0] : previousValue;
            var fromUnit = getUnit(from) || getUnit(originalValue);
            var unit = toUnit || fromUnit;
            if (is.und(to)) to = previousValue;
            tween.from = decomposeValue(from, unit);
            tween.to = decomposeValue(getRelativeValue(to, from), unit);
            tween.start = previousTween ? previousTween.end : 0;
            tween.end = tween.start + tween.delay + tween.duration + tween.endDelay;
            tween.easing = parseEasings(tween.easing, tween.duration);
            tween.isPath = is.pth(tweenValue);
            tween.isPathTargetInsideSVG = tween.isPath && is.svg(animatable.target);
            tween.isColor = is.col(tween.from.original);
            if (tween.isColor) tween.round = 1;
            previousTween = tween;
            return tween;
        }));
    }
    var setProgressValue = {
        css: function(t, p, v) {
            return t.style[p] = v;
        },
        attribute: function(t, p, v) {
            return t.setAttribute(p, v);
        },
        object: function(t, p, v) {
            return t[p] = v;
        },
        transform: function(t, p, v, transforms, manual) {
            transforms.list.set(p, v);
            if (p === transforms.last || manual) {
                var str = "";
                transforms.list.forEach((function(value, prop) {
                    str += prop + "(" + value + ") ";
                }));
                t.style.transform = str;
            }
        }
    };
    function setTargetsValue(targets, properties) {
        var animatables = getAnimatables(targets);
        animatables.forEach((function(animatable) {
            for (var property in properties) {
                var value = getFunctionValue(properties[property], animatable);
                var target = animatable.target;
                var valueUnit = getUnit(value);
                var originalValue = getOriginalTargetValue(target, property, valueUnit, animatable);
                var unit = valueUnit || getUnit(originalValue);
                var to = getRelativeValue(validateValue(value, unit), originalValue);
                var animType = getAnimationType(target, property);
                setProgressValue[animType](target, property, to, animatable.transforms, true);
            }
        }));
    }
    function createAnimation(animatable, prop) {
        var animType = getAnimationType(animatable.target, prop.name);
        if (animType) {
            var tweens = normalizeTweens(prop, animatable);
            var lastTween = tweens[tweens.length - 1];
            return {
                type: animType,
                property: prop.name,
                animatable,
                tweens,
                duration: lastTween.end,
                delay: tweens[0].delay,
                endDelay: lastTween.endDelay
            };
        }
    }
    function getAnimations(animatables, properties) {
        return filterArray(flattenArray(animatables.map((function(animatable) {
            return properties.map((function(prop) {
                return createAnimation(animatable, prop);
            }));
        }))), (function(a) {
            return !is.und(a);
        }));
    }
    function getInstanceTimings(animations, tweenSettings) {
        var animLength = animations.length;
        var getTlOffset = function(anim) {
            return anim.timelineOffset ? anim.timelineOffset : 0;
        };
        var timings = {};
        timings.duration = animLength ? Math.max.apply(Math, animations.map((function(anim) {
            return getTlOffset(anim) + anim.duration;
        }))) : tweenSettings.duration;
        timings.delay = animLength ? Math.min.apply(Math, animations.map((function(anim) {
            return getTlOffset(anim) + anim.delay;
        }))) : tweenSettings.delay;
        timings.endDelay = animLength ? timings.duration - Math.max.apply(Math, animations.map((function(anim) {
            return getTlOffset(anim) + anim.duration - anim.endDelay;
        }))) : tweenSettings.endDelay;
        return timings;
    }
    var instanceID = 0;
    function createNewInstance(params) {
        var instanceSettings = replaceObjectProps(defaultInstanceSettings, params);
        var tweenSettings = replaceObjectProps(defaultTweenSettings, params);
        var properties = getProperties(tweenSettings, params);
        var animatables = getAnimatables(params.targets);
        var animations = getAnimations(animatables, properties);
        var timings = getInstanceTimings(animations, tweenSettings);
        var id = instanceID;
        instanceID++;
        return mergeObjects(instanceSettings, {
            id,
            children: [],
            animatables,
            animations,
            duration: timings.duration,
            delay: timings.delay,
            endDelay: timings.endDelay
        });
    }
    var activeInstances = [];
    var engine = function() {
        var raf;
        function play() {
            if (!raf && (!isDocumentHidden() || !anime.suspendWhenDocumentHidden) && activeInstances.length > 0) raf = requestAnimationFrame(step);
        }
        function step(t) {
            var activeInstancesLength = activeInstances.length;
            var i = 0;
            while (i < activeInstancesLength) {
                var activeInstance = activeInstances[i];
                if (!activeInstance.paused) {
                    activeInstance.tick(t);
                    i++;
                } else {
                    activeInstances.splice(i, 1);
                    activeInstancesLength--;
                }
            }
            raf = i > 0 ? requestAnimationFrame(step) : void 0;
        }
        function handleVisibilityChange() {
            if (!anime.suspendWhenDocumentHidden) return;
            if (isDocumentHidden()) raf = cancelAnimationFrame(raf); else {
                activeInstances.forEach((function(instance) {
                    return instance._onDocumentVisibility();
                }));
                engine();
            }
        }
        if ("undefined" !== typeof document) document.addEventListener("visibilitychange", handleVisibilityChange);
        return play;
    }();
    function isDocumentHidden() {
        return !!document && document.hidden;
    }
    function anime(params) {
        if (void 0 === params) params = {};
        var startTime = 0, lastTime = 0, now = 0;
        var children, childrenLength = 0;
        var resolve = null;
        function makePromise(instance) {
            var promise = window.Promise && new Promise((function(_resolve) {
                return resolve = _resolve;
            }));
            instance.finished = promise;
            return promise;
        }
        var instance = createNewInstance(params);
        makePromise(instance);
        function toggleInstanceDirection() {
            var direction = instance.direction;
            if ("alternate" !== direction) instance.direction = "normal" !== direction ? "normal" : "reverse";
            instance.reversed = !instance.reversed;
            children.forEach((function(child) {
                return child.reversed = instance.reversed;
            }));
        }
        function adjustTime(time) {
            return instance.reversed ? instance.duration - time : time;
        }
        function resetTime() {
            startTime = 0;
            lastTime = adjustTime(instance.currentTime) * (1 / anime.speed);
        }
        function seekChild(time, child) {
            if (child) child.seek(time - child.timelineOffset);
        }
        function syncInstanceChildren(time) {
            if (!instance.reversePlayback) for (var i = 0; i < childrenLength; i++) seekChild(time, children[i]); else for (var i$1 = childrenLength; i$1--; ) seekChild(time, children[i$1]);
        }
        function setAnimationsProgress(insTime) {
            var i = 0;
            var animations = instance.animations;
            var animationsLength = animations.length;
            while (i < animationsLength) {
                var anim = animations[i];
                var animatable = anim.animatable;
                var tweens = anim.tweens;
                var tweenLength = tweens.length - 1;
                var tween = tweens[tweenLength];
                if (tweenLength) tween = filterArray(tweens, (function(t) {
                    return insTime < t.end;
                }))[0] || tween;
                var elapsed = minMax(insTime - tween.start - tween.delay, 0, tween.duration) / tween.duration;
                var eased = isNaN(elapsed) ? 1 : tween.easing(elapsed);
                var strings = tween.to.strings;
                var round = tween.round;
                var numbers = [];
                var toNumbersLength = tween.to.numbers.length;
                var progress = void 0;
                for (var n = 0; n < toNumbersLength; n++) {
                    var value = void 0;
                    var toNumber = tween.to.numbers[n];
                    var fromNumber = tween.from.numbers[n] || 0;
                    if (!tween.isPath) value = fromNumber + eased * (toNumber - fromNumber); else value = getPathProgress(tween.value, eased * toNumber, tween.isPathTargetInsideSVG);
                    if (round) if (!(tween.isColor && n > 2)) value = Math.round(value * round) / round;
                    numbers.push(value);
                }
                var stringsLength = strings.length;
                if (!stringsLength) progress = numbers[0]; else {
                    progress = strings[0];
                    for (var s = 0; s < stringsLength; s++) {
                        strings[s];
                        var b = strings[s + 1];
                        var n$1 = numbers[s];
                        if (!isNaN(n$1)) if (!b) progress += n$1 + " "; else progress += n$1 + b;
                    }
                }
                setProgressValue[anim.type](animatable.target, anim.property, progress, animatable.transforms);
                anim.currentValue = progress;
                i++;
            }
        }
        function setCallback(cb) {
            if (instance[cb] && !instance.passThrough) instance[cb](instance);
        }
        function countIteration() {
            if (instance.remaining && true !== instance.remaining) instance.remaining--;
        }
        function setInstanceProgress(engineTime) {
            var insDuration = instance.duration;
            var insDelay = instance.delay;
            var insEndDelay = insDuration - instance.endDelay;
            var insTime = adjustTime(engineTime);
            instance.progress = minMax(insTime / insDuration * 100, 0, 100);
            instance.reversePlayback = insTime < instance.currentTime;
            if (children) syncInstanceChildren(insTime);
            if (!instance.began && instance.currentTime > 0) {
                instance.began = true;
                setCallback("begin");
            }
            if (!instance.loopBegan && instance.currentTime > 0) {
                instance.loopBegan = true;
                setCallback("loopBegin");
            }
            if (insTime <= insDelay && 0 !== instance.currentTime) setAnimationsProgress(0);
            if (insTime >= insEndDelay && instance.currentTime !== insDuration || !insDuration) setAnimationsProgress(insDuration);
            if (insTime > insDelay && insTime < insEndDelay) {
                if (!instance.changeBegan) {
                    instance.changeBegan = true;
                    instance.changeCompleted = false;
                    setCallback("changeBegin");
                }
                setCallback("change");
                setAnimationsProgress(insTime);
            } else if (instance.changeBegan) {
                instance.changeCompleted = true;
                instance.changeBegan = false;
                setCallback("changeComplete");
            }
            instance.currentTime = minMax(insTime, 0, insDuration);
            if (instance.began) setCallback("update");
            if (engineTime >= insDuration) {
                lastTime = 0;
                countIteration();
                if (!instance.remaining) {
                    instance.paused = true;
                    if (!instance.completed) {
                        instance.completed = true;
                        setCallback("loopComplete");
                        setCallback("complete");
                        if (!instance.passThrough && "Promise" in window) {
                            resolve();
                            makePromise(instance);
                        }
                    }
                } else {
                    startTime = now;
                    setCallback("loopComplete");
                    instance.loopBegan = false;
                    if ("alternate" === instance.direction) toggleInstanceDirection();
                }
            }
        }
        instance.reset = function() {
            var direction = instance.direction;
            instance.passThrough = false;
            instance.currentTime = 0;
            instance.progress = 0;
            instance.paused = true;
            instance.began = false;
            instance.loopBegan = false;
            instance.changeBegan = false;
            instance.completed = false;
            instance.changeCompleted = false;
            instance.reversePlayback = false;
            instance.reversed = "reverse" === direction;
            instance.remaining = instance.loop;
            children = instance.children;
            childrenLength = children.length;
            for (var i = childrenLength; i--; ) instance.children[i].reset();
            if (instance.reversed && true !== instance.loop || "alternate" === direction && 1 === instance.loop) instance.remaining++;
            setAnimationsProgress(instance.reversed ? instance.duration : 0);
        };
        instance._onDocumentVisibility = resetTime;
        instance.set = function(targets, properties) {
            setTargetsValue(targets, properties);
            return instance;
        };
        instance.tick = function(t) {
            now = t;
            if (!startTime) startTime = now;
            setInstanceProgress((now + (lastTime - startTime)) * anime.speed);
        };
        instance.seek = function(time) {
            setInstanceProgress(adjustTime(time));
        };
        instance.pause = function() {
            instance.paused = true;
            resetTime();
        };
        instance.play = function() {
            if (!instance.paused) return;
            if (instance.completed) instance.reset();
            instance.paused = false;
            activeInstances.push(instance);
            resetTime();
            engine();
        };
        instance.reverse = function() {
            toggleInstanceDirection();
            instance.completed = instance.reversed ? false : true;
            resetTime();
        };
        instance.restart = function() {
            instance.reset();
            instance.play();
        };
        instance.remove = function(targets) {
            var targetsArray = parseTargets(targets);
            removeTargetsFromInstance(targetsArray, instance);
        };
        instance.reset();
        if (instance.autoplay) instance.play();
        return instance;
    }
    function removeTargetsFromAnimations(targetsArray, animations) {
        for (var a = animations.length; a--; ) if (arrayContains(targetsArray, animations[a].animatable.target)) animations.splice(a, 1);
    }
    function removeTargetsFromInstance(targetsArray, instance) {
        var animations = instance.animations;
        var children = instance.children;
        removeTargetsFromAnimations(targetsArray, animations);
        for (var c = children.length; c--; ) {
            var child = children[c];
            var childAnimations = child.animations;
            removeTargetsFromAnimations(targetsArray, childAnimations);
            if (!childAnimations.length && !child.children.length) children.splice(c, 1);
        }
        if (!animations.length && !children.length) instance.pause();
    }
    function removeTargetsFromActiveInstances(targets) {
        var targetsArray = parseTargets(targets);
        for (var i = activeInstances.length; i--; ) {
            var instance = activeInstances[i];
            removeTargetsFromInstance(targetsArray, instance);
        }
    }
    function stagger(val, params) {
        if (void 0 === params) params = {};
        var direction = params.direction || "normal";
        var easing = params.easing ? parseEasings(params.easing) : null;
        var grid = params.grid;
        var axis = params.axis;
        var fromIndex = params.from || 0;
        var fromFirst = "first" === fromIndex;
        var fromCenter = "center" === fromIndex;
        var fromLast = "last" === fromIndex;
        var isRange = is.arr(val);
        var val1 = isRange ? parseFloat(val[0]) : parseFloat(val);
        var val2 = isRange ? parseFloat(val[1]) : 0;
        var unit = getUnit(isRange ? val[1] : val) || 0;
        var start = params.start || 0 + (isRange ? val1 : 0);
        var values = [];
        var maxValue = 0;
        return function(el, i, t) {
            if (fromFirst) fromIndex = 0;
            if (fromCenter) fromIndex = (t - 1) / 2;
            if (fromLast) fromIndex = t - 1;
            if (!values.length) {
                for (var index = 0; index < t; index++) {
                    if (!grid) values.push(Math.abs(fromIndex - index)); else {
                        var fromX = !fromCenter ? fromIndex % grid[0] : (grid[0] - 1) / 2;
                        var fromY = !fromCenter ? Math.floor(fromIndex / grid[0]) : (grid[1] - 1) / 2;
                        var toX = index % grid[0];
                        var toY = Math.floor(index / grid[0]);
                        var distanceX = fromX - toX;
                        var distanceY = fromY - toY;
                        var value = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                        if ("x" === axis) value = -distanceX;
                        if ("y" === axis) value = -distanceY;
                        values.push(value);
                    }
                    maxValue = Math.max.apply(Math, values);
                }
                if (easing) values = values.map((function(val) {
                    return easing(val / maxValue) * maxValue;
                }));
                if ("reverse" === direction) values = values.map((function(val) {
                    return axis ? val < 0 ? -1 * val : -val : Math.abs(maxValue - val);
                }));
            }
            var spacing = isRange ? (val2 - val1) / maxValue : val1;
            return start + spacing * (Math.round(100 * values[i]) / 100) + unit;
        };
    }
    function timeline(params) {
        if (void 0 === params) params = {};
        var tl = anime(params);
        tl.duration = 0;
        tl.add = function(instanceParams, timelineOffset) {
            var tlIndex = activeInstances.indexOf(tl);
            var children = tl.children;
            if (tlIndex > -1) activeInstances.splice(tlIndex, 1);
            function passThrough(ins) {
                ins.passThrough = true;
            }
            for (var i = 0; i < children.length; i++) passThrough(children[i]);
            var insParams = mergeObjects(instanceParams, replaceObjectProps(defaultTweenSettings, params));
            insParams.targets = insParams.targets || params.targets;
            var tlDuration = tl.duration;
            insParams.autoplay = false;
            insParams.direction = tl.direction;
            insParams.timelineOffset = is.und(timelineOffset) ? tlDuration : getRelativeValue(timelineOffset, tlDuration);
            passThrough(tl);
            tl.seek(insParams.timelineOffset);
            var ins = anime(insParams);
            passThrough(ins);
            children.push(ins);
            var timings = getInstanceTimings(children, params);
            tl.delay = timings.delay;
            tl.endDelay = timings.endDelay;
            tl.duration = timings.duration;
            tl.seek(0);
            tl.reset();
            if (tl.autoplay) tl.play();
            return tl;
        };
        return tl;
    }
    anime.version = "3.2.1";
    anime.speed = 1;
    anime.suspendWhenDocumentHidden = true;
    anime.running = activeInstances;
    anime.remove = removeTargetsFromActiveInstances;
    anime.get = getOriginalTargetValue;
    anime.set = setTargetsValue;
    anime.convertPx = convertPxToUnit;
    anime.path = getPath;
    anime.setDashoffset = setDashoffset;
    anime.stagger = stagger;
    anime.timeline = timeline;
    anime.easing = parseEasings;
    anime.penner = penner;
    anime.random = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const anime_es = anime;
    let isLoad = false;
    window.addEventListener("load", (() => {
        isLoad = true;
    }));
    function contentDefault(selector) {
        if (true === isLoad && null === document.querySelector(".content-here__wrapper")) {
            const $el = document.querySelector(selector);
            $el.innerHTML = "";
            $el.insertAdjacentHTML("beforeend", `\n\t\t\t<div class="content-here__wrapper">\n\t\t\t<span class="_icon-content content-here__icon"></span>\n\t\t\t</div>\n\t\t\t`);
            document.querySelector(".content-here__wrapper").style.transform = "scale(0)";
            anime_es({
                targets: ".content-here__wrapper",
                scale: {
                    value: 1,
                    duration: 700
                }
            });
        }
    }
    contentDefault(".days-between-dates");
    function resultRenderHtml(selector, options) {
        const $el = document.querySelector(selector);
        let currentOrSetEndDate = "";
        if ("current" === options.endDate) currentOrSetEndDate = options.curentData; else currentOrSetEndDate = options.endDate;
        function incldFirstDayRender() {
            if (true === options.includingFirstDay) return `(включно)`; else return ``;
        }
        if (true === options.isError) {
            $el.innerHTML = "";
            $el.insertAdjacentHTML("beforeend", `\n\t\t<div class="result-render-dbd error-blinking-result unselectable">\n\t\t\t<h4 class='tittle tittle-error tittle-result'>Помилка!!!</h4>\n\t\t\t<div class="dbd__column-result">\n\t\t\t\t<p class="error-result">${options.errorMessage}</p>\n\t\t\t</div>\n\t\t</div>\n\t\t`);
            document.querySelector(".result-render-dbd").style.transform = "scale(0)";
            anime_es({
                targets: ".result-render-dbd",
                scale: {
                    value: 1,
                    duration: 700
                }
            });
        } else if (false === options.isError) {
            $el.innerHTML = "";
            $el.insertAdjacentHTML("beforeend", `\n\t\t\t<div class="result-render-dbd">\n\t\t\t\t<h4 class="tittle dbd__tittle tittle-result">Результат</h4>\n\t\t\t\t<div class="dbd__table">\n\t\t\t\t\t<div class="dbd__title-result-wrapper">\n\t\t\t\t\t\t\t<div class="dbd__column-title">\n\t\t\t\t\t\t\t\t<p>Період&nbsp;${incldFirstDayRender()}:</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="dbd__column-result">\n\t\t\t\t\t\t\t\t<p>${options.starDate} - ${currentOrSetEndDate}</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="dbd__title-result-wrapper">\n\t\t\t\t\t\t<div class="dbd__column-title">\n\t\t\t\t\t\t\t<p>Інтервал:</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="dbd__column-result">\n\t\t\t\t\t\t\t<p>${options.years}р. ${options.months}міс. ${options.days}дн.</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="dbd__title-result-wrapper">\n\t\t\t\t\t\t<div class="dbd__column-title">\n\t\t\t\t\t\t\t<p>Календарних&nbsp;днів:</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="dbd__column-result">\n\t\t\t\t\t\t\t<p>${options.totalDays} дн.</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t`);
            const resultElem = document.querySelector(".result-render-dbd");
            resultElem.style.transform = "scale(0) translateY(550px)";
            anime_es({
                targets: ".result-render-dbd",
                translateY: {
                    value: 0,
                    duration: 700
                },
                scale: {
                    value: 1,
                    duration: 300,
                    easing: "easeInOutQuad"
                }
            });
        }
    }
    class InputsDbd {
        constructor(selector) {
            this.$el = document.querySelectorAll(selector);
            this.$dbdTextRender = document.querySelector(".days-between-dates");
            this.$btnSubmit = document.querySelector(".main__btn-submit");
            this.btnsSettings = document.querySelector(".main__settings");
            this.$inputD = document.getElementById("dateStartD");
            this.$inputM = document.getElementById("dateStartM");
            this.$inputY = document.getElementById("dateStartY");
            this.memoryInputsStart = "";
            this.memoryInputsEnd = "";
            this.trueMaxD;
 //! правильна к-сть днів в місяці якщо нам відомо міс. і р.
                        this.trueMaxDEnd;
 //! правильна к-сть днів в місяці якщо нам відомо міс. і р.
                        this.$inputEndD = document.getElementById("dateEndD");
            this.$inputEndM = document.getElementById("dateEndM");
            this.$inputEndY = document.getElementById("dateEndY");
            this.currentEndD = this.formatDateTwoNum((new Date).getDate());
            this.currentEndM = this.formatDateTwoNum((new Date).getMonth() + 1);
            this.currentEndY = (new Date).getFullYear();
            this.$inputEndD.placeholder = this.currentEndD;
            this.$inputEndM.placeholder = this.currentEndM;
            this.$inputEndY.placeholder = this.currentEndY;
            this.currentDate = `${this.currentEndD}.${this.currentEndM}.${this.currentEndY}`;
            this.$checkedFirstDay = document.querySelector(`[data-input-setting="first-day"]`);
            this.$checkedLastDay = document.querySelector(`[data-input-setting="last-day"]`);
            this.includingFirstDay = false;
            this.includingLastDay = false;
            this.isLoad = false;
            window.addEventListener("load", (() => {
                this.isLoad = true;
            }));
            this.resultDbdVisible = false;
        }
        changeplaceholderContent(eventTargetInput, count) {
            if (count >= 3 && count <= 6) if ("" !== eventTargetInput.value || "" !== this.$inputEndD.value || "" !== this.$inputEndM.value || "" !== this.$inputEndY.value) {
                this.$inputEndD.placeholder = "дд";
                this.$inputEndM.placeholder = "мм";
                this.$inputEndY.placeholder = "рррр";
            } else if ("" === this.$inputEndD.value && "" === this.$inputEndM.value && "" === this.$inputEndY.value) {
                this.$inputEndD.placeholder = this.currentEndD;
                this.$inputEndM.placeholder = this.currentEndM;
                this.$inputEndY.placeholder = this.currentEndY;
            }
        }
        validEventTargetInput(eventTargetInput, count) {
            const eValue = eventTargetInput.value;
            if (2 === count || 5 === count) {
                eventTargetInput.value = eValue.replace(/(.{4})./, "$1").replace(/[^\d]/g, "");
                if (this.$el[count].value.length >= 4) if (count + 1 < 4) this.$el[count + 1].focus();
            } else {
                eventTargetInput.value = eValue.replace(/(.{2})./, "$1").replace(/[^\d]/g, "");
                if (this.$el[count].value.length >= 2) this.$el[count + 1].focus();
                if (0 === count || 3 === count && true === this.isLoad && "" === this.$inputM.value && "" === this.$inputY.value) {
                    if (Number(eventTargetInput.value) > 31) this.colorErrorInputOverDate(eventTargetInput, "31", "red", "black", count);
                    if ("00" === eventTargetInput.value) this.colorErrorInputOverDate(eventTargetInput, "01", "red", "black", count);
                }
                if (1 === count || 4 === count) {
                    if ("00" === eventTargetInput.value) this.colorErrorInputOverDate(eventTargetInput, "01", "red", "black", count);
                    if (Number(eventTargetInput.value) > 12) this.colorErrorInputOverDate(eventTargetInput, "12", "red", "black", count);
                }
            }
        }
        autoRenameDayInYear() {
            if (2 === this.$inputD.value.length && 2 === this.$inputM.value.length && 4 === this.$inputY.value.length || 2 === this.$inputEndD.value.length && 2 === this.$inputEndM.value.length && 4 === this.$inputEndY.value.length) {
                Number(this.$inputD.value);
                const m = Number(this.$inputM.value);
                const y = Number(this.$inputY.value);
                Number(this.$inputEndD.value);
                const mEnd = Number(this.$inputEndM.value);
                const yEnd = Number(this.$inputEndY.value);
                const calendarGen = (year, index) => {
                    const daysArray = [];
                    for (let i = 0; i < 12; i++) {
                        const daysInMonth = new Date(year, i + 1, 0).getDate();
                        daysArray.push(daysInMonth);
                    }
                    return daysArray[index];
                };
                if ("" !== this.$inputM.value && "" !== this.$inputY.value) {
                    let onlineInputsStart = `${this.$inputM.value}${this.$inputY.value}`;
                    if (onlineInputsStart !== this.memoryInputsStart) {
                        this.memoryInputsStart = `${this.$inputM.value}${this.$inputY.value}`;
                        this.trueMaxD = calendarGen(y, m - 1);
                    }
                } else "" === this.memoryInputsStart;
                if (this.memoryInputsEnd[0] !== this.$inputEndM.value || this.memoryInputsEnd[1] !== this.$inputEndY.value) {
                    this.memoryInputsEnd = [ this.$inputEndM.value, this.$inputEndY.value ];
                    this.trueMaxDEnd = calendarGen(yEnd, mEnd - 1);
                }
                if (Number(this.$inputD.value) > this.trueMaxD) {
                    this.$inputD.style.color = "red";
                    setTimeout((() => {
                        this.$inputD.value = this.trueMaxD;
                        this.$inputD.style.color = "green";
                        localStorage.setItem("inputD", this.trueMaxD);
                        setTimeout((() => {
                            this.$inputD.style.color = "black";
                        }), 1e3);
                    }), 200);
                }
                if (Number(this.$inputEndD.value) >= this.trueMaxDEnd) {
                    this.$inputEndD.value = this.trueMaxDEnd;
                    localStorage.setItem("inputEndD", this.$inputEndD.value);
                }
            }
        }
        runSetItemLS(count, $element) {
            switch (count) {
              case 0:
                localStorage.setItem("inputD", $element);
                break;

              case 1:
                localStorage.setItem("inputM", $element);
                break;

              case 2:
                localStorage.setItem("inputY", $element);
                break;

              case 3:
                localStorage.setItem("inputEndD", $element);
                break;

              case 4:
                localStorage.setItem("inputEndM", $element);
                break;

              case 5:
                localStorage.setItem("inputEndY", $element);
                break;
            }
        }
        ifRenderResultDbd() {
            const resultDbd = document.querySelector(".result-render-dbd");
            if (resultDbd) {
                this.resultDbdVisible = true;
                localStorage.setItem("resultDbdVisible", this.resultDbdVisible);
            } else {
                this.resultDbdVisible = false;
                localStorage.setItem("resultDbdVisible", this.resultDbdVisible);
            }
        }
        colorErrorInputOverDate($el, rplc, colorEror, color, count) {
            $el.style.color = colorEror;
            setTimeout((() => {
                $el.style.color = "green";
                $el.value = $el.value.replace(/\d+/, rplc);
                this.runSetItemLS(count, $el.value);
                setTimeout((() => {
                    $el.style.color = color;
                }), 1e3);
            }), 200);
        }
        inputsFocusKey(eventTargetInput, count) {
            let countBackspacePositionZero = 0;
            let countKeyLeft = 0;
            let countKeyRight = 0;
            const cursorPosition = eventTargetInput.selectionStart;
            eventTargetInput.setSelectionRange(cursorPosition, cursorPosition);
            eventTargetInput.addEventListener("blur", (function(e) {
                const changeFirstStr = str => {
                    eventTargetInput.value = eventTargetInput.value.replace(/^(\d)$/, `${str}$1`);
                };
                if (1 === eventTargetInput.value.length && 0 === count || 1 === count || 3 === count || 4 === count) changeFirstStr("0");
                if (2 === count || 5 === count) {
                    if (Number(eventTargetInput.value) >= 10 && Number(eventTargetInput.value) <= 29 && 2 === eventTargetInput.value.length) eventTargetInput.value = eventTargetInput.value.replace(/^/, `20`);
                    if (Number(eventTargetInput.value) >= 30 && Number(eventTargetInput.value) <= 99 && 2 === eventTargetInput.value.length) eventTargetInput.value = eventTargetInput.value.replace(/^/, `19`);
                }
                switch (count) {
                  case 0:
                    localStorage.setItem("inputD", e.target.value);
                    break;

                  case 1:
                    localStorage.setItem("inputM", e.target.value);
                    break;

                  case 2:
                    localStorage.setItem("inputY", e.target.value);
                    break;

                  case 3:
                    localStorage.setItem("inputEndD", e.target.value);
                    break;

                  case 4:
                    localStorage.setItem("inputEndM", e.target.value);
                    break;

                  case 5:
                    localStorage.setItem("inputEndY", e.target.value);
                    break;
                }
            }));
            eventTargetInput.addEventListener("keyup", (e => {
                if (8 === e.keyCode && 0 === e.target.selectionStart) {
                    //! Backspace key
                    countBackspacePositionZero += 1;
                    if (count - 1 !== -1 && 2 === countBackspacePositionZero) {
                        this.$el[count - 1].focus();
                        const lastSymbol = this.$el[count - 1].value.length;
                        this.$el[count - 1].setSelectionRange(lastSymbol, lastSymbol);
                        countBackspacePositionZero = 0;
                    }
                } else countBackspacePositionZero = 0;
                if (13 === e.keyCode) {
                    //! Enter key
                    e.target.blur();
                    window.addEventListener("unload", (function() {
                        e.target.blur();
                    }));
                    this.$btnSubmit.click();
                }
                if (37 === e.keyCode && 0 === e.target.selectionStart) {
                    //! <- key
                    countKeyLeft += 1;
                    countKeyRight = 0;
                    if (count - 1 !== -1 && 2 === countKeyLeft) {
                        countKeyLeft = 0;
                        this.$el[count - 1].focus();
                        const lastSymbol = this.$el[count - 1].value.length;
                        this.$el[count - 1].setSelectionRange(lastSymbol, lastSymbol);
                    }
                } else countKeyLeft = 0;
                if (39 === e.keyCode && e.target.selectionStart === e.target.value.length) {
                    //! -> key
                    countKeyRight += 1;
                    countKeyLeft = 0;
                    if (count - 1 !== 4 && 2 === countKeyRight) {
                        countKeyRight = 0;
                        this.$el[count + 1].focus();
                        this.$el[count + 1].setSelectionRange(0, 0);
                    }
                } else countKeyRight = 0;
            }));
        }
        escapeFromFocusInputUnload() {
            this.$el.forEach((elem => {
                window.addEventListener("unload", (() => {
                    elem.blur();
                }));
            }));
        }
        eTargetClick() {
            document.addEventListener("click", (event => event.target));
        }
        validEventTargetClick(eventTargetClick, count) {
            const value = eventTargetClick.value;
            if (2 === count || 5 === count) eventTargetClick.value = value.slice(0, 4); else eventTargetClick.value = value.slice(0, 2);
        }
        setLoadLocalStorage($elem, key) {
            $elem.addEventListener("blur", (() => {
                localStorage.setItem(key, $elem.value);
            }));
            $elem.addEventListener("input", (() => {
                localStorage.setItem(key, $elem.value);
            }));
            window.addEventListener("load", (() => {
                $elem.value = localStorage.getItem(key);
                contentDefault(".days-between-dates");
            }));
        }
        afterLocalStorageRun() {
            window.addEventListener("load", (() => {
                if (false !== this.dateStart() && "true" === localStorage.getItem("resultDbdVisible")) this.$btnSubmit.click();
            }));
        }
        loadLocalStorageCheackbox(key, $elem, includingDays) {
            window.addEventListener("load", (() => {
                const incDay = localStorage.getItem(key);
                if ("false" === incDay) {
                    $elem.checked = false;
                    false;
                }
                if ("true" === incDay) {
                    $elem = true;
                    true;
                }
            }));
        }
        runLocalStorage() {
            this.setLoadLocalStorage(this.$inputD, "inputD");
            this.setLoadLocalStorage(this.$inputM, "inputM");
            this.setLoadLocalStorage(this.$inputY, "inputY");
            this.setLoadLocalStorage(this.$inputEndD, "inputEndD");
            this.setLoadLocalStorage(this.$inputEndM, "inputEndM");
            this.setLoadLocalStorage(this.$inputEndY, "inputEndY");
            this.loadLocalStorageCheackbox("includingFirstDay", this.$checkedFirstDay, this.includingFirstDay);
            this.loadLocalStorageCheackbox("includingLastDay", this.$checkedLastDay, this.includingLastDay);
            this.afterLocalStorageRun();
            return this;
        }
        localStorageClear(mod) {
            if ("start" === mod) {
                localStorage.removeItem("inputD");
                localStorage.removeItem("inputM");
                localStorage.removeItem("inputY");
            } else if ("end" === mod) {
                localStorage.removeItem("inputEndD");
                localStorage.removeItem("inputEndM");
                localStorage.removeItem("inputEndY");
            }
        }
        formatDateTwoNum(liveDate) {
            liveDate += "";
            if (1 === liveDate.length) return liveDate = "0" + liveDate; else return Number(liveDate);
        }
        dateStart() {
            if ("" !== this.$inputD.value && "" !== this.$inputM.value && "" !== this.$inputY.value && 2 === this.$inputD.value.length && 2 === this.$inputM.value.length && 4 === this.$inputY.value.length) return `${this.$inputD.value}.${this.$inputM.value}.${this.$inputY.value}`; else return false;
        }
        dateEnd() {
            if (true === this.isLoad) if ("" !== this.$inputEndD.value && "" !== this.$inputEndM.value && "" !== this.$inputEndY.value && 2 === this.$inputEndD.value.length && 2 === this.$inputEndM.value.length && 4 === this.$inputEndY.value.length) return `${this.$inputEndD.value}.${this.$inputEndM.value}.${this.$inputEndY.value}`; else if ("" === this.$inputEndD.value && "" === this.$inputEndM.value && "" === this.$inputEndY.value) return "current"; else if (2 !== this.$inputEndD.value.length || 2 !== this.$inputEndM.value.length || 4 !== this.$inputEndY.value.length) return "error";
        }
        eventBtns() {
            const $elBtns = document.querySelectorAll(".btn");
            document.querySelector(".days-between-dates");
            document.querySelector(".result-render-dbd");
            $elBtns.forEach((i => {
                i.addEventListener("click", (e => {
                    if (e.target.closest(`[data-btn="clear-start"]`)) {
                        this.$inputD.value = "";
                        this.$inputM.value = "";
                        this.$inputY.value = "";
                        this.localStorageClear("start");
                        this.ifRenderResultDbd();
                    } else if (e.target.closest(`[data-btn="clear-end"]`)) {
                        this.$inputEndD.value = "";
                        this.$inputEndM.value = "";
                        this.$inputEndY.value = "";
                        this.$inputEndD.placeholder = this.currentEndD;
                        this.$inputEndM.placeholder = this.currentEndM;
                        this.$inputEndY.placeholder = this.currentEndY;
                        this.localStorageClear("end");
                        this.ifRenderResultDbd();
                    } else if (e.target.closest(`[data-btn="clear-result"]`)) {
                        contentDefault(".days-between-dates");
                        this.resultDbdVisible = false;
                        localStorage.setItem("resultDbdVisible", this.resultDbdVisible);
                    }
                }));
            }));
        }
        setPlaceholder(evenTarget, count) {
            const originalPlaceholder = evenTarget.getAttribute("placeholder");
            if (evenTarget.getAttribute("placeholder") === originalPlaceholder) evenTarget.setAttribute("placeholder", "");
            evenTarget.addEventListener("blur", (() => {
                if ("" === evenTarget.getAttribute("placeholder")) evenTarget.setAttribute("placeholder", originalPlaceholder);
            }));
        }
        setChekbox() {
            const classNameChecked = "checked";
            if (true === this.$checkedFirstDay.checked || "true" === localStorage.getItem("includingFirstDay")) {
                this.$checkedFirstDay.parentNode.classList.add(classNameChecked);
                this.includingFirstDay = true;
            }
            if (false === this.$checkedFirstDay.checked || "false" === localStorage.getItem("includingFirstDay")) {
                this.$checkedFirstDay.parentNode.classList.remove(classNameChecked);
                this.includingFirstDay = false;
            }
            if (true === this.$checkedLastDay.checked || "true" === localStorage.getItem("includingLastDay")) {
                this.$checkedLastDay.parentNode.classList.add(classNameChecked);
                this.includingLastDay = true;
            }
            if (false === this.$checkedLastDay.checked || "false" === localStorage.getItem("includingLastDay")) {
                this.$checkedLastDay.parentNode.classList.remove(classNameChecked);
                this.includingLastDay = false;
            }
            this.btnsSettings.addEventListener("input", (e => {
                const setClassNameChekbox = (dataName, includingDay) => {
                    if (e.target.dataset.inputSetting === dataName) if (e.target.checked) {
                        e.target.parentNode.classList.add(classNameChecked);
                        if (1 === includingDay) {
                            this.includingFirstDay = true;
                            localStorage.setItem("includingFirstDay", this.includingFirstDay);
                        }
                        if (2 === includingDay) {
                            this.includingLastDay = true;
                            localStorage.setItem("includingLastDay", this.includingLastDay);
                        }
                    } else {
                        e.target.parentNode.classList.remove(classNameChecked);
                        if (1 === includingDay) {
                            this.includingFirstDay = false;
                            localStorage.setItem("includingFirstDay", this.includingFirstDay);
                        }
                        if (2 === includingDay) {
                            this.includingLastDay = false;
                            localStorage.setItem("includingLastDay", this.includingLastDay);
                        }
                    }
                };
                setClassNameChekbox("first-day", 1);
                setClassNameChekbox("last-day", 2);
            }));
        }
        errorInpust() {
            let countItems = 0;
            this.$el.forEach((i => {
                countItems += 1;
                const errorInput = (mod, err) => {
                    i.classList.add("error-inputs");
                    contentDefault(".days-between-dates");
                    i.addEventListener("animationend", (() => {
                        i.classList.remove("error-inputs");
                    }));
                    if ("Error > 13M" === mod) resultRenderHtml(".days-between-dates", {
                        isError: true,
                        errorClassName: "error-result-dbd",
                        errorMessage: "Кількість місяців у році не може перевищувати 12!"
                    });
                };
                if (true === this.isLoad) {
                    if (2 === countItems && Number(i.value) > 12 || 5 === countItems && Number(i.value) > 12) errorInput("Error > 13M", i.value);
                    if (false === this.dateStart()) if (i.value.length < 2 && countItems <= 2) //! errorInpust Start date
                    errorInput(); else if (i.value.length < 4 && 3 === countItems) errorInput();
                    if ("error" === this.dateEnd()) if (i.value.length < 2 && countItems >= 4 && countItems <= 5) //! errorInpust End date
                    errorInput(); else if (i.value.length < 4 && 6 === countItems) errorInput();
                }
            }));
        }
        scrollToElem() {
            this.$btnSubmit.addEventListener("click", (() => {
                const sparkPlan = document.querySelector(".result-render-dbd");
                if (sparkPlan) {
                    const sparkPlanBottom = sparkPlan.offsetTop - 30;
                    window.scrollTo({
                        top: sparkPlanBottom,
                        behavior: "smooth"
                    });
                }
            }));
        }
    }
    const inputsDbd = new InputsDbd(".main__input");
    inputsDbd.runLocalStorage();
    inputsDbd.eventBtns();
    for (let count = 0; count < inputsDbd.$el.length; count++) {
        let iInputs = inputsDbd.$el[count];
        iInputs.setAttribute("inputmode", "numeric");
        iInputs.addEventListener("focus", (event => {
            //! event FOCUS iInputs!!!==================
            inputsDbd.inputsFocusKey(event.target, count);
            inputsDbd.autoRenameDayInYear();
            inputsDbd.changeplaceholderContent(event.target, count);
            inputsDbd.setPlaceholder(event.target, count);
        }));
        iInputs.addEventListener("input", (event => {
            //! event INPUT iInputs!!!=================
            inputsDbd.validEventTargetInput(event.target, count);
            inputsDbd.autoRenameDayInYear();
            inputsDbd.changeplaceholderContent(event.target, count);
        }));
        window.addEventListener("load", (() => {
            //! event LOAD iInputs!!!=================
            inputsDbd.autoRenameDayInYear();
            inputsDbd.validEventTargetInput(iInputs, count);
            inputsDbd.changeplaceholderContent(iInputs, count);
        }));
    }
    inputsDbd.setChekbox();
    inputsDbd.runLocalStorage();
    inputsDbd.$btnSubmit.addEventListener("click", (e => {
        //! event CLICK btnSubmit!!!===========
        inputsDbd.errorInpust();
        for (let count = 0; count < inputsDbd.$el.length; count++) {
            let iInputs = inputsDbd.$el[count];
            inputsDbd.validEventTargetClick(iInputs, count);
        }
        if (false !== inputsDbd.dateStart() && inputsDbd.$el[1].value <= 12 && inputsDbd.$el[4].value <= 12) {
            const dbd = new DaysBetweenDates(".days-between-dates", {
                startDate: inputsDbd.dateStart(),
                endDate: inputsDbd.dateEnd(),
                includingFirstDay: inputsDbd.includingFirstDay,
                includingLastDay: inputsDbd.includingLastDay
            });
            //!====
            if (false !== dbd.errorMessage()) resultRenderHtml(".days-between-dates", {
                isError: false,
                totalDays: dbd.totalDays(),
                starDate: inputsDbd.dateStart(),
                endDate: inputsDbd.dateEnd(),
                curentData: inputsDbd.currentDate,
                years: dbd.calcYear,
                months: dbd.calcMonths,
                days: dbd.calcDays,
                includingFirstDay: inputsDbd.includingFirstDay
            }); else if (false === dbd.errorMessage() && "error" !== inputsDbd.dateEnd()) resultRenderHtml(".days-between-dates", {
                isError: true,
                errorClassName: "error-result-dbd",
                errorMessage: "Початкова дата більша за кінцеву дату!"
            });
        }
        inputsDbd.ifRenderResultDbd();
        inputsDbd.scrollToElem();
    }));
    inputsDbd.escapeFromFocusInputUnload();
    //!====================================RIPPLE Button================================
        function btnRipleEffect(data, className) {
        document.addEventListener("click", (function(e) {
            const targetItem = e.target;
            if (targetItem.closest(`[data-${data}]`)) {
                const button = targetItem.closest(`[data-${data}]`);
                const ripple = document.createElement("span");
                const diameter = Math.max(button.clientWidth, button.clientHeight);
                const radius = diameter / 2;
                ripple.style.width = ripple.style.height = `${diameter}px`;
                ripple.style.left = `${e.pageX - (button.getBoundingClientRect().left + scrollX) - radius}px`;
                ripple.style.top = `${e.pageY - (button.getBoundingClientRect().top + scrollY) - radius}px`;
                ripple.classList.add(className);
                //! Налаштування: якщо дописати в HTML data-ripple="once", то анімація не накладується!!!
                                button.dataset["ripple"] = true && button.querySelector(`.${className}`) ? button.querySelector(`.${className}`).remove() : null;
                button.appendChild(ripple);
                const timeOut = getAnimationDuration(ripple);
                setTimeout((() => {
                    ripple ? ripple.remove() : null;
                }), timeOut);
                function getAnimationDuration() {
                    const aDuration = window.getComputedStyle(ripple).animationDuration;
                    return aDuration.includes("ms") ? aDuration.replace("ms", "") : 1e3 * aDuration.replace("s", "");
                }
            }
        }));
    }
    btnRipleEffect("ripple", "ripple");
    btnRipleEffect("ripple-clear", "ripple-clear");
    btnRipleEffect("input-ripple-clear", "ripple-clear");
    window["FLS"] = true;
    isWebp();
})();