! function() {
    "use strict";
    var t = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t) {
            setTimeout(t, 1e3 / 60)
        },
        e = window.Circles = function(t) {
            var e = t.id;
            if (this._el = document.getElementById(e), null !== this._el) {
                this._radius = t.radius || 10, this._duration = void 0 === t.duration ? 500 : t.duration, this._value = 0, this._maxValue = t.maxValue || 100, this._text = void 0 === t.text ? function(t) {
                    return this.htmlifyNumber(t)
                } : t.text, this._strokeWidth = t.width || 10, this._colors = t.colors || ["#EEE", "#F00"], this._svg = null, this._movingPath = null, this._wrapContainer = null, this._textContainer = null, this._textWrpClass = "circles-text-wrp", this._textClass = "circles-text", this._numberClass = "circles-number", this._styleWrapper = t.styleWrapper === !1 ? !1 : !0, this._styleText = t.styleText === !1 ? !1 : !0;
                var i = Math.PI / 180 * 270;
                this._start = -Math.PI / 180 * 90, this._startPrecise = this._precise(this._start), this._circ = i - this._start, this._generate().update(t.value || 0)
            }
        };
    e.prototype = {
        VERSION: "0.0.6",
        _generate: function() {
            return this._svgSize = 200, this._radiusAdjusted = this._radius - this._strokeWidth / 2, this._generateSvg()._generateText()._generateWrapper(), this._el.innerHTML = "", this._el.appendChild(this._wrapContainer), this
        },
        _setPercentage: function(t) {
            this._movingPath.setAttribute("d", this._calculatePath(t, !0)), this._textContainer.innerHTML = this._getText(this.getValueFromPercent(t))
        },
        _generateWrapper: function() {
            return this._wrapContainer = document.createElement("div"), this._wrapContainer.className = this._wrpClass, this._styleWrapper && (this._wrapContainer.style.position = "relative", this._wrapContainer.style.display = "inline-block"), this._wrapContainer.appendChild(this._svg), this._wrapContainer.appendChild(this._textContainer), this
        },
        _generateText: function() {
            if (this._textContainer = document.createElement("div"), this._textContainer.className = this._textClass, this._styleText) {
                var t = {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    textAlign: "center",
                    width: "100%",
                    fontSize: .7 * this._radius + "px",
                    height: this._svgSize + "px",
                    lineHeight: this._svgSize + "px"
                };
                for (var e in t) this._textContainer.style[e] = t[e]
            }
            return this._textContainer.innerHTML = this._getText(0), this
        },
        _getText: function(t) {
            return this._text ? (void 0 === t && (t = this._value), t = parseFloat(t.toFixed(2)), "function" == typeof this._text ? this._text.call(this, t) : this._text) : ""
        },
        _generateSvg: function() {
            return this._svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), this._svg.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this._svg.setAttribute("width", this._svgSize), this._svg.setAttribute("height", this._svgSize), this._generatePath(100, !1, this._colors[0])._generatePath(1, !0, this._colors[1]), this._movingPath = this._svg.getElementsByTagName("path")[1], this
        },
        _generatePath: function(t, e, i) {
            var s = document.createElementNS("http://www.w3.org/2000/svg", "path");
            return s.setAttribute("fill", "transparent"), s.setAttribute("stroke", i), s.setAttribute("stroke-width", this._strokeWidth), s.setAttribute("d", this._calculatePath(t, e)), this._svg.appendChild(s), this
        },
        _calculatePath: function(t, e) {
            var i = this._start + t / 100 * this._circ,
                s = this._precise(i);
            return this._arc(s, e)
        },
        _arc: function(t, e) {
            var i = t - .001,
                s = t - this._startPrecise < Math.PI ? 0 : 1;
            return ["M", this._radius + this._radiusAdjusted * Math.cos(this._startPrecise), this._radius + this._radiusAdjusted * Math.sin(this._startPrecise), "A", this._radiusAdjusted, this._radiusAdjusted, 0, s, 1, this._radius + this._radiusAdjusted * Math.cos(i), this._radius + this._radiusAdjusted * Math.sin(i), e ? "" : "Z"].join(" ")
        },
        _precise: function(t) {
            return Math.round(1e3 * t) / 1e3
        },
        htmlifyNumber: function(t, e, i) {
            e = e || "circles-integer", i = i || "circles-decimals";
            var s = (t + "").split("."),
                r = '<span class="' + e + '">' + s[0] + "</span>";
            return s.length > 1 && (r += '.<span class="' + i + '">' + s[1].substring(0, 2) + "</span>"), r
        },
        updateRadius: function(t) {
            return this._radius = t, this._generate().update(!0)
        },
        updateWidth: function(t) {
            return this._strokeWidth = t, this._generate().update(!0)
        },
        updateColors: function(t) {
            this._colors = t;
            var e = this._svg.getElementsByTagName("path");
            return e[0].setAttribute("stroke", t[0]), e[1].setAttribute("stroke", t[1]), this
        },
        getPercent: function() {
            return 100 * this._value / this._maxValue
        },
        getValueFromPercent: function(t) {
            return this._maxValue * t / 100
        },
        getValue: function() {
            return this._value
        },
        getMaxValue: function() {
            return this._maxValue
        },
        update: function(e, i) {
            if (e === !0) return this._setPercentage(this.getPercent()), this;
            if (this._value == e || isNaN(e)) return this;
            void 0 === i && (i = this._duration);
            var s, r, n, a, h = this,
                u = h.getPercent(),
                _ = 1;
            return this._value = Math.min(this._maxValue, Math.max(0, e)), i ? (s = h.getPercent(), r = s > u, _ += s % 1, n = Math.floor(Math.abs(s - u) / _), a = i / n, function o(e) {
                if (r ? u += _ : u -= _, r && u >= s || !r && s >= u) return void t(function() {
                    h._setPercentage(s)
                });
                t(function() {
                    h._setPercentage(u)
                });
                var i = Date.now(),
                    n = i - e;
                n >= a ? o(i) : setTimeout(function() {
                    o(Date.now())
                }, a - n)
            }(Date.now()), this) : (this._setPercentage(this.getPercent()), this)
        }
    }, e.create = function(t) {
        return new e(t)
    }
}();