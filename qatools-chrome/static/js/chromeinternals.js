// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Sets the width (in pixels) on a DOM node.
 * @param {!HtmlNode} node The node whose width is being set.
 * @param {number} widthPx The width in pixels.
 */
function setNodeWidth(node, widthPx) {
    node.style.width = widthPx.toFixed(0) + 'px';
}

/**
 * Sets the height (in pixels) on a DOM node.
 * @param {!HtmlNode} node The node whose height is being set.
 * @param {number} heightPx The height in pixels.
 */
function setNodeHeight(node, heightPx) {
    node.style.height = heightPx.toFixed(0) + 'px';
}

/**
 * Sets the position and size of a DOM node (in pixels).
 * @param {!HtmlNode} node The node being positioned.
 * @param {number} leftPx The left position in pixels.
 * @param {number} topPx The top position in pixels.
 * @param {number} widthPx The width in pixels.
 * @param {number} heightPx The height in pixels.
 */
function setNodePosition(node, leftPx, topPx, widthPx, heightPx) {
    node.style.left = leftPx.toFixed(0) + 'px';
    node.style.top = topPx.toFixed(0) + 'px';
    setNodeWidth(node, widthPx);
    setNodeHeight(node, heightPx);
}

/**
 * Sets the visibility for a DOM node.
 * @param {!HtmlNode} node The node being positioned.
 * @param {boolean} isVisible Whether to show the node or not.
 */
function setNodeDisplay(node, isVisible) {
    node.style.display = isVisible ? '' : 'none';
}

/**
 * Toggles the visibility of a DOM node.
 * @param {!HtmlNode} node The node to show or hide.
 */
function toggleNodeDisplay(node) {
    setNodeDisplay(node, !getNodeDisplay(node));
}

/**
 * Returns the visibility of a DOM node.
 * @param {!HtmlNode} node The node to query.
 */
function getNodeDisplay(node) {
    return node.style.display != 'none';
}

/**
 * Adds a node to |parentNode|, of type |tagName|.
 * @param {!HtmlNode} parentNode The node that will be the parent of the new
 *     element.
 * @param {string} tagName the tag name of the new element.
 * @return {!HtmlElement} The newly created element.
 */
function addNode(parentNode, tagName) {
    var elem = parentNode.ownerDocument.createElement(tagName);
    parentNode.appendChild(elem);
    return elem;
}

/**
 * Adds |text| to node |parentNode|.
 * @param {!HtmlNode} parentNode The node to add text to.
 * @param {string} text The text to be added.
 * @return {!Object} The newly created text node.
 */
function addTextNode(parentNode, text) {
    var textNode = parentNode.ownerDocument.createTextNode(text);
    parentNode.appendChild(textNode);
    return textNode;
}

/**
 * Adds a node to |parentNode|, of type |tagName|.  Then adds
 * |text| to the new node.
 * @param {!HtmlNode} parentNode The node that will be the parent of the new
 *     element.
 * @param {string} tagName the tag name of the new element.
 * @param {string} text The text to be added.
 * @return {!HtmlElement} The newly created element.
 */
function addNodeWithText(parentNode, tagName, text) {
    var elem = parentNode.ownerDocument.createElement(tagName);
    parentNode.appendChild(elem);
    addTextNode(elem, text);
    return elem;
}

/**
 * Returns the key such that map[key] == value, or the string '?' if
 * there is no such key.
 * @param {!Object} map The object being used as a lookup table.
 * @param {Object} value The value to be found in |map|.
 * @return {string} The key for |value|, or '?' if there is no such key.
 */
function getKeyWithValue(map, value) {
    for (var key in map) {
        if (map[key] == value)
            return key;
    }
    return '?';
}

/**
 * Returns a new map with the keys and values of the input map inverted.
 * @param {!Object} map The object to have its keys and values reversed.  Not
 *     modified by the function call.
 * @return {Object} The new map with the reversed keys and values.
 */
function makeInverseMap(map) {
    var reversed = {};
    for (var key in map)
        reversed[map[key]] = key;
    return reversed;
}

/**
 * Looks up |key| in |map|, and returns the resulting entry, if there is one.
 * Otherwise, returns |key|.  Intended primarily for use with incomplete
 * tables, and for reasonable behavior with system enumerations that may be
 * extended in the future.
 * @param {!Object} map The table in which |key| is looked up.
 * @param {string} key The key to look up.
 * @return {Object|string} map[key], if it exists, or |key| if it doesn't.
 */
function tryGetValueWithKey(map, key) {
    if (key in map)
        return map[key];
    return key;
}

/**
 * Builds a string by repeating |str| |count| times.
 * @param {string} str The string to be repeated.
 * @param {number} count The number of times to repeat |str|.
 * @return {string} The constructed string
 */
function makeRepeatedString(str, count) {
    var out = [];
    for (var i = 0; i < count; ++i)
        out.push(str);
    return out.join('');
}

/**
 * Clones a basic POD object.  Only a new top level object will be cloned.  It
 * will continue to reference the same values as the original object.
 * @param {Object} object The object to be cloned.
 * @return {Object} A copy of |object|.
 */
function shallowCloneObject(object) {
    if (!(object instanceof Object))
        return object;
    var copy = {};
    for (var key in object) {
        copy[key] = object[key];
    }
    return copy;
}

/**
 * Helper to make sure singleton classes are not instantiated more than once.
 * @param {Function} ctor The constructor function being checked.
 */
function assertFirstConstructorCall(ctor) {
    // This is the variable which is set by cr.addSingletonGetter().
    if (ctor.hasCreateFirstInstance_) {
        throw Error(
            'The class ' + ctor.name + ' is a singleton, and should ' +
            'only be accessed using ' + ctor.name + '.getInstance().');
    }
    ctor.hasCreateFirstInstance_ = true;
}

function hasTouchScreen() {
    return 'ontouchstart' in window;
}

// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * TablePrinter is a helper to format a table as ASCII art or an HTML table.
 *
 * Usage: call addRow() and addCell() repeatedly to specify the data.
 *
 * addHeaderCell() can optionally be called to specify header cells for a
 * single header row.  The header row appears at the top of an HTML formatted
 * table, and uses thead and th tags.  In ascii tables, the header is separated
 * from the table body by a partial row of dashes.
 *
 * setTitle() can optionally be used to set a title that is displayed before
 * the header row.  In HTML tables, it uses the title class and in ascii tables
 * it's between two rows of dashes.
 *
 * Once all the fields have been input, call toText() to format it as text or
 * toHTML() to format it as HTML.
 */
var TablePrinter = (function() {
    'use strict';

    /**
     * @constructor
     */
    function TablePrinter() {
        this.rows_ = [];
        this.hasHeaderRow_ = false;
        this.title_ = null;
        // Number of cells automatically added at the start of new rows.
        this.newRowCellIndent_ = 0;
    }

    TablePrinter.prototype = {
        /**
         * Sets the number of blank cells to add after each call to addRow.
         */
        setNewRowCellIndent: function(newRowCellIndent) {
            this.newRowCellIndent_ = newRowCellIndent;
        },

        /**
         * Starts a new row.
         */
        addRow: function() {
            this.rows_.push([]);
            for (var i = 0; i < this.newRowCellIndent_; ++i)
                this.addCell('');
        },

        /**
         * Adds a column to the current row, setting its value to cellText.
         *
         * @return {!TablePrinterCell} the cell that was added.
         */
        addCell: function(cellText) {
            var r = this.rows_[this.rows_.length - 1];
            var cell = new TablePrinterCell(cellText);
            r.push(cell);
            return cell;
        },

        /**
         * Sets the title displayed at the top of a table.  Titles are optional.
         */
        setTitle: function(title) {
            this.title_ = title;
        },

        /**
         * Adds a header row, if not already present, and adds a new column to it,
         * setting its contents to |headerText|.
         *
         * @return {!TablePrinterCell} the cell that was added.
         */
        addHeaderCell: function(headerText) {
            // Insert empty new row at start of |rows_| if currently no header row.
            if (!this.hasHeaderRow_) {
                this.rows_.splice(0, 0, []);
                this.hasHeaderRow_ = true;
            }
            var cell = new TablePrinterCell(headerText);
            this.rows_[0].push(cell);
            return cell;
        },

        /**
         * Returns the maximum number of columns this table contains.
         */
        getNumColumns: function() {
            var numColumns = 0;
            for (var i = 0; i < this.rows_.length; ++i) {
                numColumns = Math.max(numColumns, this.rows_[i].length);
            }
            return numColumns;
        },

        /**
         * Returns the cell at position (rowIndex, columnIndex), or null if there is
         * no such cell.
         */
        getCell_: function(rowIndex, columnIndex) {
            if (rowIndex >= this.rows_.length)
                return null;
            var row = this.rows_[rowIndex];
            if (columnIndex >= row.length)
                return null;
            return row[columnIndex];
        },

        /**
         * Returns true if searchString can be found entirely within a cell.
         * Case insensitive.
         *
         * @param {string} string String to search for, must be lowercase.
         * @return {boolean} True if some cell contains searchString.
         */
        search: function(searchString) {
            var numColumns = this.getNumColumns();
            for (var r = 0; r < this.rows_.length; ++r) {
                for (var c = 0; c < numColumns; ++c) {
                    var cell = this.getCell_(r, c);
                    if (!cell)
                        continue;
                    if (cell.text.toLowerCase().indexOf(searchString) != -1)
                        return true;
                }
            }
            return false;
        },

        /**
         * Prints a formatted text representation of the table data to the
         * node |parent|.  |spacing| indicates number of extra spaces, if any,
         * to add between columns.
         */
        toText: function(spacing, parent) {
            var pre = addNode(parent, 'pre');
            var numColumns = this.getNumColumns();

            // Figure out the maximum width of each column.
            var columnWidths = [];
            columnWidths.length = numColumns;
            for (var i = 0; i < numColumns; ++i)
                columnWidths[i] = 0;

            // If header row is present, temporarily add a spacer row to |rows_|.
            if (this.hasHeaderRow_) {
                var headerSpacerRow = [];
                for (var c = 0; c < numColumns; ++c) {
                    var cell = this.getCell_(0, c);
                    if (!cell)
                        continue;
                    var spacerStr = makeRepeatedString('-', cell.text.length);
                    headerSpacerRow.push(new TablePrinterCell(spacerStr));
                }
                this.rows_.splice(1, 0, headerSpacerRow);
            }

            var numRows = this.rows_.length;
            for (var c = 0; c < numColumns; ++c) {
                for (var r = 0; r < numRows; ++r) {
                    var cell = this.getCell_(r, c);
                    if (cell && !cell.allowOverflow) {
                        columnWidths[c] = Math.max(columnWidths[c], cell.text.length);
                    }
                }
            }

            var out = [];

            // Print title, if present.
            if (this.title_) {
                var titleSpacerStr = makeRepeatedString('-', this.title_.length);
                out.push(titleSpacerStr);
                out.push('\n');
                out.push(this.title_);
                out.push('\n');
                out.push(titleSpacerStr);
                out.push('\n');
            }

            // Print each row.
            var spacingStr = makeRepeatedString(' ', spacing);
            for (var r = 0; r < numRows; ++r) {
                for (var c = 0; c < numColumns; ++c) {
                    var cell = this.getCell_(r, c);
                    if (cell) {
                        // Pad the cell with spaces to make it fit the maximum column width.
                        var padding = columnWidths[c] - cell.text.length;
                        var paddingStr = makeRepeatedString(' ', padding);

                        if (cell.alignRight)
                            out.push(paddingStr);
                        if (cell.link) {
                            // Output all previous text, and clear |out|.
                            addTextNode(pre, out.join(''));
                            out = [];

                            var linkNode = addNodeWithText(pre, 'a', cell.text);
                            linkNode.href = cell.link;
                        } else {
                            out.push(cell.text);
                        }
                        if (!cell.alignRight)
                            out.push(paddingStr);
                        out.push(spacingStr);
                    }
                }
                out.push('\n');
            }

            // Remove spacer row under the header row, if one was added.
            if (this.hasHeaderRow_)
                this.rows_.splice(1, 1);

            addTextNode(pre, out.join(''));
        },

        /**
         * Adds a new HTML table to the node |parent| using the specified style.
         */
        toHTML: function(parent, style) {
            var numRows = this.rows_.length;
            var numColumns = this.getNumColumns();

            var table = addNode(parent, 'table');
            table.setAttribute('class', style);

            var thead = addNode(table, 'thead');
            var tbody = addNode(table, 'tbody');

            // Add title, if needed.
            if (this.title_) {
                var tableTitleRow = addNode(thead, 'tr');
                var tableTitle = addNodeWithText(tableTitleRow, 'th', this.title_);
                tableTitle.colSpan = numColumns;
                tableTitle.classList.add('title');
            }

            // Fill table body, adding header row first, if needed.
            for (var r = 0; r < numRows; ++r) {
                var cellType;
                var row;
                if (r == 0 && this.hasHeaderRow_) {
                    row = addNode(thead, 'tr');
                    cellType = 'th';
                } else {
                    row = addNode(tbody, 'tr');
                    cellType = 'td';
                }
                for (var c = 0; c < numColumns; ++c) {
                    var cell = this.getCell_(r, c);
                    if (cell) {
                        var tableCell = addNode(row, cellType, cell.text);
                        if (cell.alignRight)
                            tableCell.alignRight = true;
                        // If allowing overflow on the rightmost cell of a row,
                        // make the cell span the rest of the columns.  Otherwise,
                        // ignore the flag.
                        if (cell.allowOverflow && !this.getCell_(r, c + 1))
                            tableCell.colSpan = numColumns - c;
                        if (cell.link) {
                            var linkNode = addNodeWithText(tableCell, 'a', cell.text);
                            linkNode.href = cell.link;
                        } else {
                            addTextNode(tableCell, cell.text);
                        }
                    }
                }
            }
            return table;
        }
    };

    /**
     * Links are only used in HTML tables.
     */
    function TablePrinterCell(value) {
        this.text = '' + value;
        this.link = null;
        this.alignRight = false;
        this.allowOverflow = false;
    }

    return TablePrinter;
})();

// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Base class to represent a "view". A view is an absolutely positioned box on
 * the page.
 */
var View = (function() {
    'use strict';

    /**
     * @constructor
     */
    function View() {
        this.isVisible_ = true;
    }

    View.prototype = {
        /**
         * Called to reposition the view on the page. Measurements are in pixels.
         */
        setGeometry: function(left, top, width, height) {
            this.left_ = left;
            this.top_ = top;
            this.width_ = width;
            this.height_ = height;
        },

        /**
         * Called to show/hide the view.
         */
        show: function(isVisible) {
            this.isVisible_ = isVisible;
        },

        isVisible: function() {
            return this.isVisible_;
        },

        /**
         * Method of the observer class.
         *
         * Called to check if an observer needs the data it is
         * observing to be actively updated.
         */
        isActive: function() {
            return this.isVisible();
        },

        getLeft: function() {
            return this.left_;
        },

        getTop: function() {
            return this.top_;
        },

        getWidth: function() {
            return this.width_;
        },

        getHeight: function() {
            return this.height_;
        },

        getRight: function() {
            return this.getLeft() + this.getWidth();
        },

        getBottom: function() {
            return this.getTop() + this.getHeight();
        },

        setParameters: function(params) {},

        /**
         * Called when loading a log file, after clearing all events, but before
         * loading the new ones.  |polledData| contains the data from all
         * PollableData helpers.  |tabData| contains the data for the particular
         * tab.  |logDump| is the entire log dump, which includes the other two
         * values.  It's included separately so most views don't have to depend on
         * its specifics.
         */
        onLoadLogStart: function(polledData, tabData, logDump) {},

        /**
         * Called as the final step of loading a log file.  Arguments are the same
         * as onLoadLogStart.  Returns true to indicate the tab should be shown,
         * false otherwise.
         */
        onLoadLogFinish: function(polledData, tabData, logDump) {
            return false;
        }
    };

    return View;
})();

//-----------------------------------------------------------------------------

/**
 * DivView is an implementation of View that wraps a DIV.
 */
var DivView = (function() {
    'use strict';

    // We inherit from View.
    var superClass = View;

    /**
     * @constructor
     */
    function DivView(divId) {
        // Call superclass's constructor.
        superClass.call(this);

        this.node_ = $(divId);
        if (!this.node_)
            throw new Error('Element ' + divId + ' not found');

        // Initialize the default values to those of the DIV.
        this.width_ = this.node_.offsetWidth;
        this.height_ = this.node_.offsetHeight;
        this.isVisible_ = this.node_.style.display != 'none';
    }

    DivView.prototype = {
        // Inherit the superclass's methods.
        __proto__: superClass.prototype,

        setGeometry: function(left, top, width, height) {
            superClass.prototype.setGeometry.call(this, left, top, width, height);

            this.node_.style.position = 'absolute';
            setNodePosition(this.node_, left, top, width, height);
        },

        show: function(isVisible) {
            superClass.prototype.show.call(this, isVisible);
            setNodeDisplay(this.node_, isVisible);
        },

        /**
         * Returns the wrapped DIV
         */
        getNode: function() {
            return this.node_;
        }
    };

    return DivView;
})();


//-----------------------------------------------------------------------------

/**
 * Implementation of View that sizes its child to fit the entire window.
 *
 * @param {!View} childView The child view.
 */
var WindowView = (function() {
    'use strict';

    // We inherit from View.
    var superClass = View;

    /**
     * @constructor
     */
    function WindowView(childView) {
        // Call superclass's constructor.
        superClass.call(this);

        this.childView_ = childView;
        window.addEventListener('resize', this.resetGeometry.bind(this), true);
    }

    WindowView.prototype = {
        // Inherit the superclass's methods.
        __proto__: superClass.prototype,

        setGeometry: function(left, top, width, height) {
            superClass.prototype.setGeometry.call(this, left, top, width, height);
            this.childView_.setGeometry(left, top, width, height);
        },

        show: function() {
            superClass.prototype.show.call(this, isVisible);
            this.childView_.show(isVisible);
        },

        resetGeometry: function() {
            this.setGeometry(
                0, 0, document.documentElement.clientWidth,
                document.documentElement.clientHeight);
        }
    };

    return WindowView;
})();

/**
 * View that positions two views vertically. The top view should be
 * fixed-height, and the bottom view will fill the remainder of the space.
 *
 *  +-----------------------------------+
 *  |            topView                |
 *  +-----------------------------------+
 *  |                                   |
 *  |                                   |
 *  |                                   |
 *  |          bottomView               |
 *  |                                   |
 *  |                                   |
 *  |                                   |
 *  |                                   |
 *  +-----------------------------------+
 */
var VerticalSplitView = (function() {
    'use strict';

    // We inherit from View.
    var superClass = View;

    /**
     * @param {!View} topView The top view.
     * @param {!View} bottomView The bottom view.
     * @constructor
     */
    function VerticalSplitView(topView, bottomView) {
        // Call superclass's constructor.
        superClass.call(this);

        this.topView_ = topView;
        this.bottomView_ = bottomView;
    }

    VerticalSplitView.prototype = {
        // Inherit the superclass's methods.
        __proto__: superClass.prototype,

        setGeometry: function(left, top, width, height) {
            superClass.prototype.setGeometry.call(this, left, top, width, height);

            var fixedHeight = this.topView_.getHeight();
            this.topView_.setGeometry(left, top, width, fixedHeight);

            this.bottomView_.setGeometry(
                left, top + fixedHeight, width, height - fixedHeight);
        },

        show: function(isVisible) {
            superClass.prototype.show.call(this, isVisible);

            this.topView_.show(isVisible);
            this.bottomView_.show(isVisible);
        }
    };

    return VerticalSplitView;
})();

/**
 * View that positions two views horizontally. The left view should be
 * fixed-width, and the right view will fill the remainder of the space.
 *
 *  +----------+--------------------------+
 *  |          |                          |
 *  |          |                          |
 *  |          |                          |
 *  | leftView |       rightView          |
 *  |          |                          |
 *  |          |                          |
 *  |          |                          |
 *  |          |                          |
 *  |          |                          |
 *  |          |                          |
 *  |          |                          |
 *  +----------+--------------------------+
 */
var HorizontalSplitView = (function() {
    'use strict';

    // We inherit from View.
    var superClass = View;

    /**
     * @param {!View} leftView The left view.
     * @param {!View} rightView The right view.
     * @constructor
     */
    function HorizontalSplitView(leftView, rightView) {
        // Call superclass's constructor.
        superClass.call(this);

        this.leftView_ = leftView;
        this.rightView_ = rightView;
    }

    HorizontalSplitView.prototype = {
        // Inherit the superclass's methods.
        __proto__: superClass.prototype,

        setGeometry: function(left, top, width, height) {
            superClass.prototype.setGeometry.call(this, left, top, width, height);

            var fixedWidth = this.leftView_.getWidth();
            this.leftView_.setGeometry(left, top, fixedWidth, height);

            this.rightView_.setGeometry(
                left + fixedWidth, top, width - fixedWidth, height);
        },

        show: function(isVisible) {
            superClass.prototype.show.call(this, isVisible);

            this.leftView_.show(isVisible);
            this.rightView_.show(isVisible);
        }
    };

    return HorizontalSplitView;
})();

// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Class to handle display and placement of a div that appears under the cursor
 * when it overs over a specied element.  The div always appears below and to
 * the left of the cursor.
 */
var MouseOverHelp = (function() {
    'use strict';

    /**
     * @param {string} helpDivId Name of the div to position and display
     * @param {string} mouseOverElementId Name the element that displays the
     *     |helpDivId| div on mouse over.
     * @constructor
     */
    function MouseOverHelp(helpDivId, mouseOverElementId) {
        this.node_ = $(helpDivId);

        $(mouseOverElementId).onmouseover = this.onMouseOver.bind(this);
        $(mouseOverElementId).onmouseout = this.onMouseOut.bind(this);

        this.show(false);
    }

    MouseOverHelp.prototype = {
        /**
         * Positions and displays the div, if not already visible.
         * @param {MouseEvent} event Mouse event that triggered the call.
         */
        onMouseOver: function(event) {
            if (this.isVisible_)
                return;

            this.node_.style.position = 'absolute';

            this.show(true);

            this.node_.style.left = (event.clientX + 15).toFixed(0) + 'px';
            this.node_.style.top = event.clientY.toFixed(0) + 'px';
        },

        /**
         * Hides the div when the cursor leaves the hover element.
         * @param {MouseEvent} event Mouse event that triggered the call.
         */
        onMouseOut: function(event) {
            this.show(false);
        },

        /**
         * Sets the div's visibility.
         * @param {boolean} isVisible True if the help div should be shown.
         */
        show: function(isVisible) {
            setNodeDisplay(this.node_, isVisible);
            this.isVisible_ = isVisible;
        },
    };

    return MouseOverHelp;
})();

// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Controller and View for switching between tabs.
 *
 * The View part of TabSwitcherView displays the contents of the currently
 * selected tab (only one tab can be active at a time).
 *
 * The controller part of TabSwitcherView hooks up a dropdown menu (i.e. HTML
 * SELECT) to control switching between tabs.
 */
var TabSwitcherView = (function() {
    'use strict';

    // We inherit from View.
    var superClass = View;

    var TAB_LIST_ID = 'tab-list';

    /**
     * @constructor
     *
     * @param {?Function} opt_onTabSwitched Optional callback to run when the
     *                    active tab changes. Called as
     *                    opt_onTabSwitched(oldTabId, newTabId).
     */
    function TabSwitcherView(opt_onTabSwitched) {
        assertFirstConstructorCall(TabSwitcherView);

        this.tabIdToView_ = {};
        this.tabIdToLink_ = {};
        // Map from tab id to the views link visiblity.
        this.tabIdsLinkVisibility_ = new Map();
        this.activeTabId_ = null;

        this.onTabSwitched_ = opt_onTabSwitched;

        // The ideal width of the tab list.  If width is reduced below this, the
        // tab list will be shrunk, but it will be returned to this width once it
        // can be.
        this.tabListWidth_ = $(TAB_LIST_ID).offsetWidth;

        superClass.call(this);
    }

    TabSwitcherView.prototype = {
        // Inherit the superclass's methods.
        __proto__: superClass.prototype,

        // ---------------------------------------------
        // Override methods in View
        // ---------------------------------------------

        setGeometry: function(left, top, width, height) {
            superClass.prototype.setGeometry.call(this, left, top, width, height);

            var tabListNode = $(TAB_LIST_ID);

            // Set position of the tab list.  Can't use DivView because DivView sets
            // a fixed width at creation time, and need to set the width of the tab
            // list only after its been populated.
            var tabListWidth = this.tabListWidth_;
            if (tabListWidth > width)
                tabListWidth = width;
            tabListNode.style.position = 'absolute';
            setNodePosition(tabListNode, left, top, tabListWidth, height);

            // Position each of the tab's content areas.
            for (var tabId in this.tabIdToView_) {
                var view = this.tabIdToView_[tabId];
                view.setGeometry(
                    left + tabListWidth, top, width - tabListWidth, height);
            }
        },

        show: function(isVisible) {
            superClass.prototype.show.call(this, isVisible);
            var activeView = this.getActiveTabView();
            if (activeView)
                activeView.show(isVisible);
        },

        // ---------------------------------------------

        /**
         * Adds a new tab (initially hidden).  To ensure correct tab list sizing,
         * may only be called before first layout.
         *
         * @param {string} tabId The ID to refer to the tab by.
         * @param {!View} view The tab's actual contents.
         * @param {string} name The name for the menu item that selects the tab.
         */
        addTab: function(tabId, view, name, hash) {
            if (!tabId) {
                throw Error('Must specify a non-false tabId');
            }

            this.tabIdToView_[tabId] = view;
            this.tabIdsLinkVisibility_.set(tabId, true);

            var node = addNodeWithText($(TAB_LIST_ID), 'a', name);
            node.href = hash;
            this.tabIdToLink_[tabId] = node;
            addNode($(TAB_LIST_ID), 'br');

            // Tab content views start off hidden.
            view.show(false);

            this.tabListWidth_ = $(TAB_LIST_ID).offsetWidth;
        },

        showTabLink: function(tabId, isVisible) {
            var wasActive = this.activeTabId_ == tabId;

            setNodeDisplay(this.tabIdToLink_[tabId], isVisible);
            this.tabIdsLinkVisibility_.set(tabId, isVisible);

            if (wasActive && !isVisible) {
                // If the link for active tab is being hidden, then switch to the first
                // tab which is still visible.
                for (var [localTabId, enabled] of this.tabIdsLinkVisibility_) {
                    if (enabled) {
                        this.switchToTab(localTabId);
                        break;
                    }
                }
            }
        },

        getAllTabViews: function() {
            return this.tabIdToView_;
        },

        getTabView: function(tabId) {
            return this.tabIdToView_[tabId];
        },

        getActiveTabView: function() {
            return this.tabIdToView_[this.activeTabId_];
        },

        getActiveTabId: function() {
            return this.activeTabId_;
        },

        /**
         * Changes the currently active tab to |tabId|. This has several effects:
         *   (1) Replace the tab contents view with that of the new tab.
         *   (2) Update the dropdown menu's current selection.
         *   (3) Invoke the optional onTabSwitched callback.
         */
        switchToTab: function(tabId) {
            var newView = this.getTabView(tabId);

            if (!newView) {
                throw Error('Invalid tabId');
            }

            var oldTabId = this.activeTabId_;
            this.activeTabId_ = tabId;

            if (oldTabId) {
                this.tabIdToLink_[oldTabId].classList.remove('selected');
                // Hide the previously visible tab contents.
                this.getTabView(oldTabId).show(false);
            }

            this.tabIdToLink_[tabId].classList.add('selected');

            newView.show(this.isVisible());

            if (this.onTabSwitched_)
                this.onTabSwitched_(oldTabId, tabId);
        },
    };

    return TabSwitcherView;
})();

// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * This view displays options for importing data from a log file.
 */
var ImportView = (function() {
    'use strict';

    // This is defined in index.html, but for all intents and purposes is part
    // of this view.
    var LOAD_LOG_FILE_DROP_TARGET_ID = 'import-view-drop-target';

    // We inherit from DivView.
    var superClass = DivView;

    /**
     * @constructor
     */
    function ImportView() {
        assertFirstConstructorCall(ImportView);

        // Call superclass's constructor.
        superClass.call(this, ImportView.MAIN_BOX_ID);

        this.loadedDiv_ = $(ImportView.LOADED_DIV_ID);

        this.loadFileElement_ = $(ImportView.LOAD_LOG_FILE_ID);
        this.loadFileElement_.onchange = this.logFileChanged.bind(this);
        this.loadStatusText_ = $(ImportView.LOAD_STATUS_TEXT_ID);

        var dropTarget = $(LOAD_LOG_FILE_DROP_TARGET_ID);
        dropTarget.ondragenter = this.onDrag.bind(this);
        dropTarget.ondragover = this.onDrag.bind(this);
        dropTarget.ondrop = this.onDrop.bind(this);
    }

    ImportView.TAB_ID = 'tab-handle-import';
    ImportView.TAB_NAME = 'Import';
    ImportView.TAB_HASH = '#import';

    // IDs for special HTML elements in import_view.html.
    ImportView.MAIN_BOX_ID = 'import-view-tab-content';
    ImportView.LOADED_DIV_ID = 'import-view-loaded-div';
    ImportView.LOAD_LOG_FILE_ID = 'import-view-load-log-file';
    ImportView.LOAD_STATUS_TEXT_ID = 'import-view-load-status-text';
    // Used in tests.
    ImportView.LOADED_INFO_USER_COMMENTS_ID = 'import-view-user-comments';

    cr.addSingletonGetter(ImportView);

    ImportView.prototype = {
        // Inherit the superclass's methods.
        __proto__: superClass.prototype,

        /**
         * Called when a log file is loaded, after clearing the old log entries and
         * loading the new ones.  Returns true to indicate the view should
         * still be visible.
         */
        onLoadLogFinish: function(polledData, unused, logDump) {
            var input = new JsEvalContext(logDump);
            jstProcess(input, $(ImportView.LOADED_DIV_ID));

            setNodeDisplay(this.loadedDiv_, true);
            return true;
        },

        /**
         * Called when something is dragged over the drop target.
         *
         * Returns false to cancel default browser behavior when a single file is
         * being dragged.  When this happens, we may not receive a list of files for
         * security reasons, which is why we allow the |files| array to be empty.
         */
        onDrag: function(event) {
            // NOTE: Use Array.prototype.indexOf here is necessary while WebKit
            // decides which type of data structure dataTransfer.types will be
            // (currently between DOMStringList and Array). These have different APIs
            // so assuming one type or the other was breaking things. See
            // http://crbug.com/115433. TODO(dbeam): Remove when standardized more.
            var indexOf = Array.prototype.indexOf;
            return indexOf.call(event.dataTransfer.types, 'Files') == -1 ||
                event.dataTransfer.files.length > 1;
        },

        /**
         * Called when something is dropped onto the drop target.  If it's a single
         * file, tries to load it as a log file.
         */
        onDrop: function(event) {
            var indexOf = Array.prototype.indexOf;
            if (indexOf.call(event.dataTransfer.types, 'Files') == -1 ||
                event.dataTransfer.files.length != 1) {
                return;
            }
            event.preventDefault();

            // Loading a log file may hide the currently active tab.  Switch to the
            // import tab to prevent this.
            document.location.hash = 'import';

            this.loadLogFile(event.dataTransfer.files[0]);
        },

        /**
         * Called when a log file is selected.
         *
         * Gets the log file from the input element and tries to read from it.
         */
        logFileChanged: function() {
            this.loadLogFile(this.loadFileElement_.files[0]);
        },

        /**
         * Attempts to read from the File |logFile|.
         */
        loadLogFile: function(logFile) {
            if (logFile) {
                this.setLoadFileStatus('Loading log...', true);
                var fileReader = new FileReader();

                fileReader.onload = this.onLoadLogFile.bind(this, logFile);
                fileReader.onerror = this.onLoadLogFileError.bind(this);

                fileReader.readAsText(logFile);
            }
        },

        /**
         * Displays an error message when unable to read the selected log file.
         * Also clears the file input control, so the same file can be reloaded.
         */
        onLoadLogFileError: function(event) {
            this.loadFileElement_.value = null;
            this.setLoadFileStatus(
                'Error ' + getKeyWithValue(FileError, event.target.error.code) +
                '.  Unable to read file.',
                false);
        },

        onLoadLogFile: function(logFile, event) {
            var result = log_util.loadLogFile(event.target.result, logFile.name);
            this.setLoadFileStatus(result, false);
        },

        /**
         * Sets the load from file status text, displayed below the load file
         * button, to |text|.  Also enables or disables the load buttons based on
         * the value of |isLoading|, which must be true if the load process is still
         * ongoing, and false when the operation has stopped, regardless of success
         * of failure.  Also, when loading is done, replaces the load button so the
         * same file can be loaded again.
         */
        setLoadFileStatus: function(text, isLoading) {
            this.enableLoadFileElement_(!isLoading);
            this.loadStatusText_.textContent = text;

            if (!isLoading) {
                // Clear the button, so the same file can be reloaded.  Recreating the
                // element seems to be the only way to do this.
                var loadFileElementId = this.loadFileElement_.id;
                var loadFileElementOnChange = this.loadFileElement_.onchange;
                this.loadFileElement_.outerHTML = this.loadFileElement_.outerHTML;
                this.loadFileElement_ = $(loadFileElementId);
                this.loadFileElement_.onchange = loadFileElementOnChange;
            }

            // Style the log output differently depending on what just happened.
            var pos = text.indexOf('Log loaded.');
            if (isLoading) {
                this.loadStatusText_.className = 'import-view-pending-log';
            } else if (pos == 0) {
                this.loadStatusText_.className = 'import-view-success-log';
            } else if (pos != -1) {
                this.loadStatusText_.className = 'import-view-warning-log';
            } else {
                this.loadStatusText_.className = 'import-view-error-log';
            }
        },

        enableLoadFileElement_: function(enabled) {
            this.loadFileElement_.disabled = !enabled;
        },
    };

    return ImportView;
})();

// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * This view displays controls for capturing network events.
 */
var CaptureView = (function() {
    'use strict';

    // We inherit from DivView.
    var superClass = DivView;

    /**
     * @constructor
     */
    function CaptureView() {
        assertFirstConstructorCall(CaptureView);

        // Call superclass's constructor.
        superClass.call(this, CaptureView.MAIN_BOX_ID);

        var byteLoggingCheckbox = $(CaptureView.BYTE_LOGGING_CHECKBOX_ID);
        byteLoggingCheckbox.onclick = this.onSetByteLogging_.bind(this);

        $(CaptureView.LIMIT_CHECKBOX_ID).onclick = this.onChangeLimit_.bind(this);

        $(CaptureView.STOP_BUTTON_ID).onclick =
            this.onStopButtonClicked_.bind(this);
        $(CaptureView.RESET_BUTTON_ID).onclick =
            this.onResetButtonClicked_.bind(this);

        new MouseOverHelp(
            CaptureView.LIMIT_HELP_ID, CaptureView.LIMIT_HELP_HOVER_ID);

        new MouseOverHelp(
            CaptureView.BYTE_LOGGING_HELP_ID,
            CaptureView.BYTE_LOGGING_HELP_HOVER_ID);

        this.onChangeLimit_();
    }

    CaptureView.TAB_ID = 'tab-handle-capture';
    CaptureView.TAB_NAME = 'Capture';
    CaptureView.TAB_HASH = '#capture';

    // IDs for special HTML elements in capture_view.html
    CaptureView.MAIN_BOX_ID = 'capture-view-tab-content';
    CaptureView.BYTE_LOGGING_CHECKBOX_ID = 'capture-view-byte-logging-checkbox';
    CaptureView.LIMIT_CHECKBOX_ID = 'capture-view-limit-checkbox';
    CaptureView.LIMIT_HELP_ID = 'capture-view-limit-help';
    CaptureView.LIMIT_HELP_HOVER_ID = 'capture-view-limit-help-hover';
    CaptureView.BYTE_LOGGING_HELP_ID = 'capture-view-byte-logging-help';
    CaptureView.BYTE_LOGGING_HELP_HOVER_ID =
        'capture-view-byte-logging-help-hover';
    CaptureView.STOP_BUTTON_ID = 'capture-view-stop-button';
    CaptureView.RESET_BUTTON_ID = 'capture-view-reset-button';

    cr.addSingletonGetter(CaptureView);

    CaptureView.prototype = {
        // Inherit the superclass's methods.
        __proto__: superClass.prototype,

        /**
         * Called when a log file is loaded, after clearing the old log entries and
         * loading the new ones.  Returns false to indicate the view should
         * be hidden.
         */
        onLoadLogFinish: function(data) {
            return false;
        },

        /**
         * Depending on the value of the checkbox, enables or disables logging of
         * actual bytes transferred.
         */
        onSetByteLogging_: function() {
            var byteLoggingCheckbox = $(CaptureView.BYTE_LOGGING_CHECKBOX_ID);

            if (byteLoggingCheckbox.checked) {
                g_browser.setCaptureMode('IncludeSocketBytes');
            } else {
                g_browser.setCaptureMode('IncludeCookiesAndCredentials');
            }
        },

        onChangeLimit_: function() {
            var limitCheckbox = $(CaptureView.LIMIT_CHECKBOX_ID);

            // Default to unlimited.
            var softLimit = Infinity;
            var hardLimit = Infinity;

            if (limitCheckbox.checked) {
                // The chosen limits are kind of arbitrary. I based it off the
                // following observation:
                //   A user-submitted log file which spanned a 7 hour time period
                //   comprised 778,235 events and required 128MB of JSON.
                //
                // That feels too big. Assuming it was representative, then scaling
                // by a factor of 4 should translate into a 32MB log file and cover
                // close to 2 hours of events, which feels better.
                //
                // A large gap is left between the hardLimit and softLimit to avoid
                // resetting the events often.
                hardLimit = 300000;
                softLimit = 150000;
            }

            EventsTracker.getInstance().setLimits(softLimit, hardLimit);
        },

        onStopButtonClicked_: function() {
            MainView.getInstance().switchToViewOnlyMode();
        },

        onResetButtonClicked_: function() {
            EventsTracker.getInstance().deleteAllLogEntries();
        },
    };

    return CaptureView;
})();

// // Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * This view displays information on the HTTP cache.
 */
var HttpCacheView = (function() {
    'use strict';

    // We inherit from DivView.
    var superClass = DivView;

    /**
     *  @constructor
     */
    function HttpCacheView() {
        assertFirstConstructorCall(HttpCacheView);

        // Call superclass's constructor.
        superClass.call(this, HttpCacheView.MAIN_BOX_ID);

        this.statsDiv_ = $(HttpCacheView.STATS_DIV_ID);

        // Register to receive http cache info.
        g_browser.addHttpCacheInfoObserver(this, true);
    }

    HttpCacheView.TAB_ID = 'tab-handle-http-cache';
    HttpCacheView.TAB_NAME = 'Cache';
    HttpCacheView.TAB_HASH = '#httpCache';

    // IDs for special HTML elements in http_cache_view.html
    HttpCacheView.MAIN_BOX_ID = 'http-cache-view-tab-content';
    HttpCacheView.STATS_DIV_ID = 'http-cache-view-cache-stats';

    cr.addSingletonGetter(HttpCacheView);

    HttpCacheView.prototype = {
        // Inherit the superclass's methods.
        __proto__: superClass.prototype,

        onLoadLogFinish: function(data) {
            return this.onHttpCacheInfoChanged(data.httpCacheInfo);
        },

        onHttpCacheInfoChanged: function(info) {
            this.statsDiv_.innerHTML = '';

            if (!info)
                return false;

            // Print the statistics.
            var statsUl = addNode(this.statsDiv_, 'ul');
            for (var statName in info.stats) {
                var li = addNode(statsUl, 'li');
                addTextNode(li, statName + ': ' + info.stats[statName]);
            }
            return true;
        }
    };

    return HttpCacheView;
})();

// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * This UI allows a user to query and update the browser's list of per-domain
 * security policies. These policies include:
 * - HSTS: HTTPS Strict Transport Security. A way for sites to elect to always
 *   use HTTPS. See http://dev.chromium.org/sts
 * - PKP: Public Key Pinning. A way for sites to pin themselves to particular
 *   public key fingerprints that must appear in their certificate chains. See
 *   https://tools.ietf.org/html/rfc7469
 * - Expect-CT. A way for sites to elect to always require valid Certificate
 *   Transparency information to be present. See
 *   https://tools.ietf.org/html/draft-ietf-httpbis-expect-ct-01
 */

var DomainSecurityPolicyView = (function() {
    'use strict';

    // We inherit from DivView.
    var superClass = DivView;

    /**
     * @constructor
     */
    function DomainSecurityPolicyView() {
        assertFirstConstructorCall(DomainSecurityPolicyView);

        // Call superclass's constructor.
        superClass.call(this, DomainSecurityPolicyView.MAIN_BOX_ID);

        this.deleteInput_ = $(DomainSecurityPolicyView.DELETE_INPUT_ID);
        this.addStsPkpInput_ = $(DomainSecurityPolicyView.ADD_HSTS_PKP_INPUT_ID);
        this.addStsCheck_ = $(DomainSecurityPolicyView.ADD_STS_CHECK_ID);
        this.addPkpCheck_ = $(DomainSecurityPolicyView.ADD_PKP_CHECK_ID);
        this.addPins_ = $(DomainSecurityPolicyView.ADD_PINS_ID);
        this.queryStsPkpInput_ =
            $(DomainSecurityPolicyView.QUERY_HSTS_PKP_INPUT_ID);
        this.queryStsPkpOutputDiv_ =
            $(DomainSecurityPolicyView.QUERY_HSTS_PKP_OUTPUT_DIV_ID);
        this.addExpectCTInput_ = $(DomainSecurityPolicyView.ADD_EXPECT_CT_INPUT_ID);
        this.addExpectCTReportUriInput_ =
            $(DomainSecurityPolicyView.ADD_EXPECT_CT_REPORT_URI_INPUT_ID);
        this.addExpectCTEnforceCheck_ =
            $(DomainSecurityPolicyView.ADD_EXPECT_CT_ENFORCE_CHECK_ID);
        this.queryExpectCTInput_ =
            $(DomainSecurityPolicyView.QUERY_EXPECT_CT_INPUT_ID);
        this.queryExpectCTOutputDiv_ =
            $(DomainSecurityPolicyView.QUERY_EXPECT_CT_OUTPUT_DIV_ID);
        this.testExpectCTReportInput_ =
            $(DomainSecurityPolicyView.TEST_REPORT_EXPECT_CT_INPUT_ID);
        this.testExpectCTOutputDiv_ =
            $(DomainSecurityPolicyView.TEST_REPORT_EXPECT_CT_OUTPUT_DIV_ID);

        var form = $(DomainSecurityPolicyView.DELETE_FORM_ID);
        form.addEventListener('submit', this.onSubmitDelete_.bind(this), false);

        form = $(DomainSecurityPolicyView.ADD_HSTS_PKP_FORM_ID);
        form.addEventListener('submit', this.onSubmitHSTSPKPAdd_.bind(this), false);

        form = $(DomainSecurityPolicyView.QUERY_HSTS_PKP_FORM_ID);
        form.addEventListener(
            'submit', this.onSubmitHSTSPKPQuery_.bind(this), false);

        form = $(DomainSecurityPolicyView.ADD_EXPECT_CT_FORM_ID);
        form.addEventListener(
            'submit', this.onSubmitExpectCTAdd_.bind(this), false);

        form = $(DomainSecurityPolicyView.QUERY_EXPECT_CT_FORM_ID);
        form.addEventListener(
            'submit', this.onSubmitExpectCTQuery_.bind(this), false);

        form = $(DomainSecurityPolicyView.TEST_REPORT_EXPECT_CT_FORM_ID);
        form.addEventListener(
            'submit', this.onSubmitExpectCTTestReport_.bind(this), false);

        g_browser.addHSTSObserver(this);
        g_browser.addExpectCTObserver(this);
    }

    DomainSecurityPolicyView.TAB_ID = 'tab-handle-domain-security-policy';
    DomainSecurityPolicyView.TAB_NAME = 'Domain Security Policy';
    // This tab was originally limited to HSTS. Even though it now encompasses
    // domain security policy more broadly, keep the hash as "#hsts" to preserve
    // links/documentation that directs users to chrome://net-internals#hsts.
    DomainSecurityPolicyView.TAB_HASH = '#hsts';

    // IDs for special HTML elements in domain_security_policy_view.html
    DomainSecurityPolicyView.MAIN_BOX_ID =
        'domain-security-policy-view-tab-content';
    DomainSecurityPolicyView.DELETE_INPUT_ID =
        'domain-security-policy-view-delete-input';
    DomainSecurityPolicyView.DELETE_FORM_ID =
        'domain-security-policy-view-delete-form';
    DomainSecurityPolicyView.DELETE_SUBMIT_ID =
        'domain-security-policy-view-delete-submit';
    // HSTS/PKP form elements
    DomainSecurityPolicyView.ADD_HSTS_PKP_INPUT_ID = 'hsts-view-add-input';
    DomainSecurityPolicyView.ADD_STS_CHECK_ID = 'hsts-view-check-sts-input';
    DomainSecurityPolicyView.ADD_PKP_CHECK_ID = 'hsts-view-check-pkp-input';
    DomainSecurityPolicyView.ADD_PINS_ID = 'hsts-view-add-pins';
    DomainSecurityPolicyView.ADD_HSTS_PKP_FORM_ID = 'hsts-view-add-form';
    DomainSecurityPolicyView.ADD_HSTS_PKP_SUBMIT_ID = 'hsts-view-add-submit';
    DomainSecurityPolicyView.QUERY_HSTS_PKP_INPUT_ID = 'hsts-view-query-input';
    DomainSecurityPolicyView.QUERY_HSTS_PKP_OUTPUT_DIV_ID =
        'hsts-view-query-output';
    DomainSecurityPolicyView.QUERY_HSTS_PKP_FORM_ID = 'hsts-view-query-form';
    DomainSecurityPolicyView.QUERY_HSTS_PKP_SUBMIT_ID = 'hsts-view-query-submit';
    // Expect-CT form elements
    DomainSecurityPolicyView.ADD_EXPECT_CT_INPUT_ID = 'expect-ct-view-add-input';
    DomainSecurityPolicyView.ADD_EXPECT_CT_REPORT_URI_INPUT_ID =
        'expect-ct-view-add-report-uri-input';
    DomainSecurityPolicyView.ADD_EXPECT_CT_ENFORCE_CHECK_ID =
        'expect-ct-view-check-enforce-input';
    DomainSecurityPolicyView.ADD_EXPECT_CT_FORM_ID = 'expect-ct-view-add-form';
    DomainSecurityPolicyView.ADD_EXPECT_CT_SUBMIT_ID =
        'expect-ct-view-add-submit';
    DomainSecurityPolicyView.QUERY_EXPECT_CT_INPUT_ID =
        'expect-ct-view-query-input';
    DomainSecurityPolicyView.QUERY_EXPECT_CT_FORM_ID =
        'expect-ct-view-query-form';
    DomainSecurityPolicyView.QUERY_EXPECT_CT_SUBMIT_ID =
        'expect-ct-view-query-submit';
    DomainSecurityPolicyView.QUERY_EXPECT_CT_OUTPUT_DIV_ID =
        'expect-ct-view-query-output';
    DomainSecurityPolicyView.TEST_REPORT_EXPECT_CT_INPUT_ID =
        'expect-ct-view-test-report-uri';
    DomainSecurityPolicyView.TEST_REPORT_EXPECT_CT_FORM_ID =
        'expect-ct-view-test-report-form';
    DomainSecurityPolicyView.TEST_REPORT_EXPECT_CT_SUBMIT_ID =
        'expect-ct-view-test-report-submit';
    DomainSecurityPolicyView.TEST_REPORT_EXPECT_CT_OUTPUT_DIV_ID =
        'expect-ct-view-test-report-output';

    cr.addSingletonGetter(DomainSecurityPolicyView);

    DomainSecurityPolicyView.prototype = {
        // Inherit the superclass's methods.
        __proto__: superClass.prototype,

        onSubmitHSTSPKPAdd_: function(event) {
            g_browser.sendHSTSAdd(
                this.addStsPkpInput_.value, this.addStsCheck_.checked,
                this.addPkpCheck_.checked, this.addPins_.value);
            g_browser.sendHSTSQuery(this.addStsPkpInput_.value);
            this.queryStsPkpInput_.value = this.addStsPkpInput_.value;
            this.addStsCheck_.checked = false;
            this.addPkpCheck_.checked = false;
            this.addStsPkpInput_.value = '';
            this.addPins_.value = '';
            event.preventDefault();
        },

        onSubmitDelete_: function(event) {
            g_browser.sendDomainSecurityPolicyDelete(this.deleteInput_.value);
            this.deleteInput_.value = '';
            event.preventDefault();
        },

        onSubmitHSTSPKPQuery_: function(event) {
            g_browser.sendHSTSQuery(this.queryStsPkpInput_.value);
            event.preventDefault();
        },

        onHSTSQueryResult: function(result) {
            if (result.error != undefined) {
                this.queryStsPkpOutputDiv_.innerHTML = '';
                var s = addNode(this.queryStsPkpOutputDiv_, 'span');
                s.textContent = result.error;
                s.style.color = '#e00';
                yellowFade(this.queryStsPkpOutputDiv_);
                return;
            }

            if (result.result == false) {
                this.queryStsPkpOutputDiv_.innerHTML = '<b>Not found</b>';
                yellowFade(this.queryStsPkpOutputDiv_);
                return;
            }

            this.queryStsPkpOutputDiv_.innerHTML = '';

            var s = addNode(this.queryStsPkpOutputDiv_, 'span');
            s.innerHTML = '<b>Found:</b><br/>';

            var keys = [
                'static_sts_domain',
                'static_upgrade_mode',
                'static_sts_include_subdomains',
                'static_sts_observed',
                'static_pkp_domain',
                'static_pkp_include_subdomains',
                'static_pkp_observed',
                'static_spki_hashes',
                'dynamic_sts_domain',
                'dynamic_upgrade_mode',
                'dynamic_sts_include_subdomains',
                'dynamic_sts_observed',
                'dynamic_sts_expiry',
                'dynamic_pkp_domain',
                'dynamic_pkp_include_subdomains',
                'dynamic_pkp_observed',
                'dynamic_pkp_expiry',
                'dynamic_spki_hashes',
            ];

            var kStaticHashKeys =
                ['public_key_hashes', 'preloaded_spki_hashes', 'static_spki_hashes'];

            var staticHashes = [];
            for (var i = 0; i < kStaticHashKeys.length; ++i) {
                var staticHashValue = result[kStaticHashKeys[i]];
                if (staticHashValue != undefined && staticHashValue != '')
                    staticHashes.push(staticHashValue);
            }

            for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                var value = result[key];
                addTextNode(this.queryStsPkpOutputDiv_, ' ' + key + ': ');

                // If there are no static_hashes, do not make it seem like there is a
                // static PKP policy in place.
                if (staticHashes.length == 0 && key.startsWith('static_pkp_')) {
                    addNode(this.queryStsPkpOutputDiv_, 'br');
                    continue;
                }

                if (key === 'static_spki_hashes') {
                    addNodeWithText(
                        this.queryStsPkpOutputDiv_, 'tt', staticHashes.join(','));
                } else if (key.indexOf('_upgrade_mode') >= 0) {
                    addNodeWithText(
                        this.queryStsPkpOutputDiv_, 'tt', modeToString(value));
                } else {
                    addNodeWithText(
                        this.queryStsPkpOutputDiv_, 'tt',
                        value == undefined ? '' : value);
                }
                addNode(this.queryStsPkpOutputDiv_, 'br');
            }

            yellowFade(this.queryStsPkpOutputDiv_);
        },

        onSubmitExpectCTAdd_: function(event) {
            g_browser.sendExpectCTAdd(
                this.addExpectCTInput_.value, this.addExpectCTReportUriInput_.value,
                this.addExpectCTEnforceCheck_.checked);
            g_browser.sendExpectCTQuery(this.addExpectCTInput_.value);
            this.queryExpectCTInput_.value = this.addExpectCTInput_.value;
            this.addExpectCTInput_.value = '';
            this.addExpectCTReportUriInput_.value = '';
            this.addExpectCTEnforceCheck_.checked = false;
            event.preventDefault();
        },

        onSubmitExpectCTQuery_: function(event) {
            g_browser.sendExpectCTQuery(this.queryExpectCTInput_.value);
            event.preventDefault();
        },

        onExpectCTQueryResult: function(result) {
            if (result.error != undefined) {
                this.queryExpectCTOutputDiv_.innerHTML = '';
                var s = addNode(this.queryExpectCTOutputDiv_, 'span');
                s.textContent = result.error;
                s.style.color = '#e00';
                yellowFade(this.queryExpectCTOutputDiv_);
                return;
            }

            if (result.result == false) {
                this.queryExpectCTOutputDiv_.innerHTML = '<b>Not found</b>';
                yellowFade(this.queryExpectCTOutputDiv_);
                return;
            }

            this.queryExpectCTOutputDiv_.innerHTML = '';

            var s = addNode(this.queryExpectCTOutputDiv_, 'span');
            s.innerHTML = '<b>Found:</b><br/>';

            var keys = [
                'dynamic_expect_ct_domain',
                'dynamic_expect_ct_observed',
                'dynamic_expect_ct_expiry',
                'dynamic_expect_ct_enforce',
                'dynamic_expect_ct_report_uri',
            ];

            for (var i in keys) {
                var key = keys[i];
                var value = result[key];
                addTextNode(this.queryExpectCTOutputDiv_, ' ' + key + ': ');
                addNodeWithText(
                    this.queryExpectCTOutputDiv_, 'tt',
                    value == undefined ? '' : value);
                addNode(this.queryExpectCTOutputDiv_, 'br');
            }

            yellowFade(this.queryExpectCTOutputDiv_);
        },

        onSubmitExpectCTTestReport_: function(event) {
            g_browser.sendExpectCTTestReport(this.testExpectCTReportInput_.value);
            event.preventDefault();
        },

        onExpectCTTestReportResult: function(result) {
            if (result == 'success') {
                addTextNode(this.testExpectCTOutputDiv_, 'Test report succeeded');
            } else {
                addTextNode(this.testExpectCTOutputDiv_, 'Test report failed');
            }
            yellowFade(this.testExpectCTOutputDiv_);
        },

    };

    function modeToString(m) {
        // These numbers must match those in
        // TransportSecurityState::STSState::UpgradeMode.
        if (m == 0) {
            return 'FORCE_HTTPS';
        } else if (m == 1) {
            return 'DEFAULT';
        } else {
            return 'UNKNOWN';
        }
    }

    function yellowFade(element) {
        element.style.transitionProperty = 'background-color';
        element.style.transitionDuration = '0';
        element.style.backgroundColor = '#fffccf';
        setTimeout(function() {
            element.style.transitionDuration = '1000ms';
            element.style.backgroundColor = '#fff';
        }, 0);
    }

    return DomainSecurityPolicyView;
})();

// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Populated by constants from the browser.  Used only by this file.
var NetInfoSources = null;

/**
 * This class provides a "bridge" for communicating between the javascript and
 * the browser.
 */
var BrowserBridge = (function() {
    'use strict';

    /**
     * Delay in milliseconds between updates of certain browser information.
     */
    var POLL_INTERVAL_MS = 5000;

    /**
     * @constructor
     */
    function BrowserBridge() {
        assertFirstConstructorCall(BrowserBridge);

        // List of observers for various bits of browser state.
        this.connectionTestsObservers_ = [];
        this.hstsObservers_ = [];
        this.expectCTObservers_ = [];
        this.constantsObservers_ = [];
        this.crosONCFileParseObservers_ = [];
        this.storeDebugLogsObservers_ = [];
        this.setNetworkDebugModeObservers_ = [];
        // Unprocessed data received before the constants.  This serves to protect
        // against passing along data before having information on how to interpret
        // it.
        this.earlyReceivedData_ = [];

        this.pollableDataHelpers_ = {};

        // Add PollableDataHelpers for NetInfoSources, which retrieve information
        // directly from the network stack.
        this.addNetInfoPollableDataHelper(
            'proxySettings', 'onProxySettingsChanged');
        this.addNetInfoPollableDataHelper('badProxies', 'onBadProxiesChanged');
        this.addNetInfoPollableDataHelper(
            'hostResolverInfo', 'onHostResolverInfoChanged');
        this.addNetInfoPollableDataHelper(
            'socketPoolInfo', 'onSocketPoolInfoChanged');
        this.addNetInfoPollableDataHelper(
            'spdySessionInfo', 'onSpdySessionInfoChanged');
        this.addNetInfoPollableDataHelper('spdyStatus', 'onSpdyStatusChanged');
        this.addNetInfoPollableDataHelper(
            'altSvcMappings', 'onAltSvcMappingsChanged');
        this.addNetInfoPollableDataHelper('quicInfo', 'onQuicInfoChanged');
        this.addNetInfoPollableDataHelper(
            'reportingInfo', 'onReportingInfoChanged');
        this.addNetInfoPollableDataHelper(
            'httpCacheInfo', 'onHttpCacheInfoChanged');

        // Add other PollableDataHelpers.
        this.pollableDataHelpers_.sessionNetworkStats = new PollableDataHelper(
            'onSessionNetworkStatsChanged',
            this.sendGetSessionNetworkStats.bind(this));
        this.pollableDataHelpers_.historicNetworkStats = new PollableDataHelper(
            'onHistoricNetworkStatsChanged',
            this.sendGetHistoricNetworkStats.bind(this));
        if (cr.isWindows) {
            this.pollableDataHelpers_.serviceProviders = new PollableDataHelper(
                'onServiceProvidersChanged', this.sendGetServiceProviders.bind(this));
        }
        this.pollableDataHelpers_.prerenderInfo = new PollableDataHelper(
            'onPrerenderInfoChanged', this.sendGetPrerenderInfo.bind(this));
        this.pollableDataHelpers_.extensionInfo = new PollableDataHelper(
            'onExtensionInfoChanged', this.sendGetExtensionInfo.bind(this));
        this.pollableDataHelpers_.dataReductionProxyInfo = new PollableDataHelper(
            'onDataReductionProxyInfoChanged',
            this.sendGetDataReductionProxyInfo.bind(this));

        // Setting this to true will cause messages from the browser to be ignored,
        // and no messages will be sent to the browser, either.  Intended for use
        // when viewing log files.
        this.disabled_ = false;

        // Interval id returned by window.setInterval for polling timer.
        this.pollIntervalId_ = null;
    }

    cr.addSingletonGetter(BrowserBridge);

    BrowserBridge.prototype = {

        //--------------------------------------------------------------------------
        // Messages sent to the browser
        //--------------------------------------------------------------------------

        /**
         * Wraps |chrome.send|.  Doesn't send anything when disabled.
         */
        send: function(value1, value2) {
            if (!this.disabled_) {
                if (arguments.length == 1) {
                    chrome.send(value1);
                } else if (arguments.length == 2) {
                    chrome.send(value1, value2);
                } else {
                    throw 'Unsupported number of arguments.';
                }
            }
        },

        sendReady: function() {
            this.send('notifyReady');
            this.setPollInterval(POLL_INTERVAL_MS);
        },

        /**
         * Some of the data we are interested is not currently exposed as a
         * stream.  This starts polling those with active observers (visible
         * views) every |intervalMs|.  Subsequent calls override previous calls
         * to this function.  If |intervalMs| is 0, stops polling.
         */
        setPollInterval: function(intervalMs) {
            if (this.pollIntervalId_ !== null) {
                window.clearInterval(this.pollIntervalId_);
                this.pollIntervalId_ = null;
            }

            if (intervalMs > 0) {
                this.pollIntervalId_ = window.setInterval(
                    this.checkForUpdatedInfo.bind(this, false), intervalMs);
            }
        },

        sendGetNetInfo: function(netInfoSource) {
            // If don't have constants yet, don't do anything yet.
            if (NetInfoSources)
                this.send('getNetInfo', [NetInfoSources[netInfoSource]]);
        },

        sendReloadProxySettings: function() {
            this.send('reloadProxySettings');
        },

        sendClearBadProxies: function() {
            this.send('clearBadProxies');
        },

        sendClearHostResolverCache: function() {
            this.send('clearHostResolverCache');
        },

        sendClearBrowserCache: function() {
            this.send('clearBrowserCache');
        },

        sendClearAllCache: function() {
            this.sendClearHostResolverCache();
            this.sendClearBrowserCache();
        },

        sendStartConnectionTests: function(url) {
            this.send('startConnectionTests', [url]);
        },

        sendHSTSQuery: function(domain) {
            this.send('hstsQuery', [domain]);
        },

        sendHSTSAdd: function(
            domain, sts_include_subdomains, pkp_include_subdomains, pins) {
            this.send(
                'hstsAdd',
                [domain, sts_include_subdomains, pkp_include_subdomains, pins]);
        },

        sendDomainSecurityPolicyDelete: function(domain) {
            this.send('domainSecurityPolicyDelete', [domain]);
        },

        sendExpectCTQuery: function(domain) {
            this.send('expectCTQuery', [domain]);
        },

        sendExpectCTAdd: function(domain, report_uri, enforce) {
            this.send('expectCTAdd', [domain, report_uri, enforce]);
        },

        sendExpectCTTestReport: function(report_uri) {
            this.send('expectCTTestReport', [report_uri]);
        },

        sendGetSessionNetworkStats: function() {
            this.send('getSessionNetworkStats');
        },

        sendGetHistoricNetworkStats: function() {
            this.send('getHistoricNetworkStats');
        },

        sendCloseIdleSockets: function() {
            this.send('closeIdleSockets');
        },

        sendFlushSocketPools: function() {
            this.send('flushSocketPools');
        },

        sendGetServiceProviders: function() {
            this.send('getServiceProviders');
        },

        sendGetPrerenderInfo: function() {
            this.send('getPrerenderInfo');
        },

        sendGetExtensionInfo: function() {
            this.send('getExtensionInfo');
        },

        sendGetDataReductionProxyInfo: function() {
            this.send('getDataReductionProxyInfo');
        },

        setCaptureMode: function(captureMode) {
            this.send('setCaptureMode', ['' + captureMode]);
        },

        importONCFile: function(fileContent, passcode) {
            this.send('importONCFile', [fileContent, passcode]);
        },

        storeDebugLogs: function() {
            this.send('storeDebugLogs');
        },

        setNetworkDebugMode: function(subsystem) {
            this.send('setNetworkDebugMode', [subsystem]);
        },

        //--------------------------------------------------------------------------
        // Messages received from the browser.
        //--------------------------------------------------------------------------

        receive: function(command, params) {
            // Does nothing if disabled.
            if (this.disabled_)
                return;

            // If no constants have been received, and params does not contain the
            // constants, delay handling the data.
            if (Constants == null && command != 'receivedConstants') {
                this.earlyReceivedData_.push({command: command, params: params});
                return;
            }

            this[command](params);

            // Handle any data that was received early in the order it was received,
            // once the constants have been processed.
            if (this.earlyReceivedData_ != null) {
                for (var i = 0; i < this.earlyReceivedData_.length; i++) {
                    var command = this.earlyReceivedData_[i];
                    this[command.command](command.params);
                }
                this.earlyReceivedData_ = null;
            }
        },

        receivedConstants: function(constants) {
            NetInfoSources = constants.netInfoSources;
            for (var i = 0; i < this.constantsObservers_.length; i++)
                this.constantsObservers_[i].onReceivedConstants(constants);
            // May have been waiting for the constants to be received before getting
            // information for the currently displayed tab.
            this.checkForUpdatedInfo();
        },

        receivedLogEntries: function(logEntries) {
            EventsTracker.getInstance().addLogEntries(logEntries);
        },

        receivedNetInfo: function(netInfo) {
            // Dispatch |netInfo| to the various PollableDataHelpers listening to
            // each field it contains.
            //
            // Currently information is only received from one source at a time, but
            // the API does allow for data from more that one to be requested at once.
            for (var source in netInfo)
                this.pollableDataHelpers_[source].update(netInfo[source]);
        },

        receivedSessionNetworkStats: function(sessionNetworkStats) {
            this.pollableDataHelpers_.sessionNetworkStats.update(sessionNetworkStats);
        },

        receivedHistoricNetworkStats: function(historicNetworkStats) {
            this.pollableDataHelpers_.historicNetworkStats.update(
                historicNetworkStats);
        },

        receivedServiceProviders: function(serviceProviders) {
            this.pollableDataHelpers_.serviceProviders.update(serviceProviders);
        },

        receivedStartConnectionTestSuite: function() {
            for (var i = 0; i < this.connectionTestsObservers_.length; i++)
                this.connectionTestsObservers_[i].onStartedConnectionTestSuite();
        },

        receivedStartConnectionTestExperiment: function(experiment) {
            for (var i = 0; i < this.connectionTestsObservers_.length; i++) {
                this.connectionTestsObservers_[i].onStartedConnectionTestExperiment(
                    experiment);
            }
        },

        receivedCompletedConnectionTestExperiment: function(info) {
            for (var i = 0; i < this.connectionTestsObservers_.length; i++) {
                this.connectionTestsObservers_[i].onCompletedConnectionTestExperiment(
                    info.experiment, info.result);
            }
        },

        receivedCompletedConnectionTestSuite: function() {
            for (var i = 0; i < this.connectionTestsObservers_.length; i++)
                this.connectionTestsObservers_[i].onCompletedConnectionTestSuite();
        },

        receivedHSTSResult: function(info) {
            for (var i = 0; i < this.hstsObservers_.length; i++)
                this.hstsObservers_[i].onHSTSQueryResult(info);
        },

        receivedExpectCTResult: function(info) {
            for (var i = 0; i < this.expectCTObservers_.length; i++)
                this.expectCTObservers_[i].onExpectCTQueryResult(info);
        },

        receivedExpectCTTestReportResult: function(result) {
            for (var i = 0; i < this.expectCTObservers_.length; i++)
                this.expectCTObservers_[i].onExpectCTTestReportResult(result);
        },

        receivedONCFileParse: function(error) {
            for (var i = 0; i < this.crosONCFileParseObservers_.length; i++)
                this.crosONCFileParseObservers_[i].onONCFileParse(error);
        },

        receivedStoreDebugLogs: function(status) {
            for (var i = 0; i < this.storeDebugLogsObservers_.length; i++)
                this.storeDebugLogsObservers_[i].onStoreDebugLogs(status);
        },

        receivedSetNetworkDebugMode: function(status) {
            for (var i = 0; i < this.setNetworkDebugModeObservers_.length; i++)
                this.setNetworkDebugModeObservers_[i].onSetNetworkDebugMode(status);
        },

        receivedPrerenderInfo: function(prerenderInfo) {
            this.pollableDataHelpers_.prerenderInfo.update(prerenderInfo);
        },

        receivedExtensionInfo: function(extensionInfo) {
            this.pollableDataHelpers_.extensionInfo.update(extensionInfo);
        },

        receivedDataReductionProxyInfo: function(dataReductionProxyInfo) {
            this.pollableDataHelpers_.dataReductionProxyInfo.update(
                dataReductionProxyInfo);
        },

        //--------------------------------------------------------------------------

        /**
         * Prevents receiving/sending events to/from the browser.
         */
        disable: function() {
            this.disabled_ = true;
            this.setPollInterval(0);
        },

        /**
         * Returns true if the BrowserBridge has been disabled.
         */
        isDisabled: function() {
            return this.disabled_;
        },

        /**
         * Adds a listener of the proxy settings. |observer| will be called back
         * when data is received, through:
         *
         *   observer.onProxySettingsChanged(proxySettings)
         *
         * |proxySettings| is a dictionary with (up to) two properties:
         *
         *   "original"  -- The settings that chrome was configured to use
         *                  (i.e. system settings.)
         *   "effective" -- The "effective" proxy settings that chrome is using.
         *                  (decides between the manual/automatic modes of the
         *                  fetched settings).
         *
         * Each of these two configurations is formatted as a string, and may be
         * omitted if not yet initialized.
         *
         * If |ignoreWhenUnchanged| is true, data is only sent when it changes.
         * If it's false, data is sent whenever it's received from the browser.
         */
        addProxySettingsObserver: function(observer, ignoreWhenUnchanged) {
            this.pollableDataHelpers_.proxySettings.addObserver(
                observer, ignoreWhenUnchanged);
        },

        /**
         * Adds a listener of the proxy settings. |observer| will be called back
         * when data is received, through:
         *
         *   observer.onBadProxiesChanged(badProxies)
         *
         * |badProxies| is an array, where each entry has the property:
         *   badProxies[i].proxy_uri: String identify the proxy.
         *   badProxies[i].bad_until: The time when the proxy stops being considered
         *                            bad. Note the time is in time ticks.
         */
        addBadProxiesObserver: function(observer, ignoreWhenUnchanged) {
            this.pollableDataHelpers_.badProxies.addObserver(
                observer, ignoreWhenUnchanged);
        },

        /**
         * Adds a listener of the host resolver info. |observer| will be called back
         * when data is received, through:
         *
         *   observer.onHostResolverInfoChanged(hostResolverInfo)
         */
        addHostResolverInfoObserver: function(observer, ignoreWhenUnchanged) {
            this.pollableDataHelpers_.hostResolverInfo.addObserver(
                observer, ignoreWhenUnchanged);
        },

        /**
         * Adds a listener of the socket pool. |observer| will be called back
         * when data is received, through:
         *
         *   observer.onSocketPoolInfoChanged(socketPoolInfo)
         */
        addSocketPoolInfoObserver: function(observer, ignoreWhenUnchanged) {
            this.pollableDataHelpers_.socketPoolInfo.addObserver(
                observer, ignoreWhenUnchanged);
        },

        /**
         * Adds a listener of the network session. |observer| will be called back
         * when data is received, through:
         *
         *   observer.onSessionNetworkStatsChanged(sessionNetworkStats)
         */
        addSessionNetworkStatsObserver: function(observer, ignoreWhenUnchanged) {
            this.pollableDataHelpers_.sessionNetworkStats.addObserver(
                observer, ignoreWhenUnchanged);
        },

        /**
         * Adds a listener of persistent network session data. |observer| will be
         * called back when data is received, through:
         *
         *   observer.onHistoricNetworkStatsChanged(historicNetworkStats)
         */
        addHistoricNetworkStatsObserver: function(observer, ignoreWhenUnchanged) {
            this.pollableDataHelpers_.historicNetworkStats.addObserver(
                observer, ignoreWhenUnchanged);
        },

        /**
         * Adds a listener of the QUIC info. |observer| will be called back
         * when data is received, through:
         *
         *   observer.onQuicInfoChanged(quicInfo)
         */
        addQuicInfoObserver: function(observer, ignoreWhenUnchanged) {
            this.pollableDataHelpers_.quicInfo.addObserver(
                observer, ignoreWhenUnchanged);
        },

        /**
         * Adds a listener of the Reporting info. |observer| will be called back
         * when data is received, through:
         *
         *   observer.onReportingInfoChanged(reportingInfo)
         */
        addReportingInfoObserver: function(observer, ignoreWhenUnchanged) {
            this.pollableDataHelpers_.reportingInfo.addObserver(
                observer, ignoreWhenUnchanged);
        },

        /**
         * Adds a listener of the SPDY info. |observer| will be called back
         * when data is received, through:
         *
         *   observer.onSpdySessionInfoChanged(spdySessionInfo)
         */
        addSpdySessionInfoObserver: function(observer, ignoreWhenUnchanged) {
            this.pollableDataHelpers_.spdySessionInfo.addObserver(
                observer, ignoreWhenUnchanged);
        },

        /**
         * Adds a listener of the SPDY status. |observer| will be called back
         * when data is received, through:
         *
         *   observer.onSpdyStatusChanged(spdyStatus)
         */
        addSpdyStatusObserver: function(observer, ignoreWhenUnchanged) {
            this.pollableDataHelpers_.spdyStatus.addObserver(
                observer, ignoreWhenUnchanged);
        },

        /**
         * Adds a listener of the altSvcMappings. |observer| will be
         * called back when data is received, through:
         *
         *   observer.onAltSvcMappingsChanged(altSvcMappings)
         */
        addAltSvcMappingsObserver: function(observer, ignoreWhenUnchanged) {
            this.pollableDataHelpers_.altSvcMappings.addObserver(
                observer, ignoreWhenUnchanged);
        },

        /**
         * Adds a listener of the service providers info. |observer| will be called
         * back when data is received, through:
         *
         *   observer.onServiceProvidersChanged(serviceProviders)
         *
         * Will do nothing if on a platform other than Windows, as service providers
         * are only present on Windows.
         */
        addServiceProvidersObserver: function(observer, ignoreWhenUnchanged) {
            if (this.pollableDataHelpers_.serviceProviders) {
                this.pollableDataHelpers_.serviceProviders.addObserver(
                    observer, ignoreWhenUnchanged);
            }
        },

        /**
         * Adds a listener for the progress of the connection tests.
         * The observer will be called back with:
         *
         *   observer.onStartedConnectionTestSuite();
         *   observer.onStartedConnectionTestExperiment(experiment);
         *   observer.onCompletedConnectionTestExperiment(experiment, result);
         *   observer.onCompletedConnectionTestSuite();
         */
        addConnectionTestsObserver: function(observer) {
            this.connectionTestsObservers_.push(observer);
        },

        /**
         * Adds a listener for the http cache info results.
         * The observer will be called back with:
         *
         *   observer.onHttpCacheInfoChanged(info);
         */
        addHttpCacheInfoObserver: function(observer, ignoreWhenUnchanged) {
            this.pollableDataHelpers_.httpCacheInfo.addObserver(
                observer, ignoreWhenUnchanged);
        },

        /**
         * Adds a listener for the results of HSTS (HTTPS Strict Transport Security)
         * queries. The observer will be called back with:
         *
         *   observer.onHSTSQueryResult(result);
         */
        addHSTSObserver: function(observer) {
            this.hstsObservers_.push(observer);
        },

        /**
         * Adds a listener for the results of Expect-CT queries. The observer will
         * be called back with:
         *
         *   observer.onExpectCTQueryResult(result);
         */
        addExpectCTObserver: function(observer) {
            this.expectCTObservers_.push(observer);
        },

        /**
         * Adds a listener for ONC file parse status. The observer will be called
         * back with:
         *
         *   observer.onONCFileParse(error);
         */
        addCrosONCFileParseObserver: function(observer) {
            this.crosONCFileParseObservers_.push(observer);
        },

        /**
         * Adds a listener for storing log file status. The observer will be called
         * back with:
         *
         *   observer.onStoreDebugLogs(status);
         */
        addStoreDebugLogsObserver: function(observer) {
            this.storeDebugLogsObservers_.push(observer);
        },

        /**
         * Adds a listener for network debugging mode status. The observer
         * will be called back with:
         *
         *   observer.onSetNetworkDebugMode(status);
         */
        addSetNetworkDebugModeObserver: function(observer) {
            this.setNetworkDebugModeObservers_.push(observer);
        },

        /**
         * Adds a listener for the received constants event. |observer| will be
         * called back when the constants are received, through:
         *
         *   observer.onReceivedConstants(constants);
         */
        addConstantsObserver: function(observer) {
            this.constantsObservers_.push(observer);
        },

        /**
         * Adds a listener for updated prerender info events
         * |observer| will be called back with:
         *
         *   observer.onPrerenderInfoChanged(prerenderInfo);
         */
        addPrerenderInfoObserver: function(observer, ignoreWhenUnchanged) {
            this.pollableDataHelpers_.prerenderInfo.addObserver(
                observer, ignoreWhenUnchanged);
        },

        /**
         * Adds a listener of extension information. |observer| will be called
         * back when data is received, through:
         *
         *   observer.onExtensionInfoChanged(extensionInfo)
         */
        addExtensionInfoObserver: function(observer, ignoreWhenUnchanged) {
            this.pollableDataHelpers_.extensionInfo.addObserver(
                observer, ignoreWhenUnchanged);
        },

        /**
         * Adds a listener of the data reduction proxy info. |observer| will be
         * called back when data is received, through:
         *
         *   observer.onDataReductionProxyInfoChanged(dataReductionProxyInfo)
         */
        addDataReductionProxyInfoObserver: function(observer, ignoreWhenUnchanged) {
            this.pollableDataHelpers_.dataReductionProxyInfo.addObserver(
                observer, ignoreWhenUnchanged);
        },

        /**
         * If |force| is true, calls all startUpdate functions.  Otherwise, just
         * runs updates with active observers.
         */
        checkForUpdatedInfo: function(force) {
            for (var name in this.pollableDataHelpers_) {
                var helper = this.pollableDataHelpers_[name];
                if (force || helper.hasActiveObserver())
                    helper.startUpdate();
            }
        },

        /**
         * Calls all startUpdate functions and, if |callback| is non-null,
         * calls it with the results of all updates.
         */
        updateAllInfo: function(callback) {
            if (callback)
                new UpdateAllObserver(callback, this.pollableDataHelpers_);
            this.checkForUpdatedInfo(true);
        },

        /**
         * Adds a PollableDataHelper that listens to the specified NetInfoSource.
         */
        addNetInfoPollableDataHelper: function(sourceName, observerMethodName) {
            this.pollableDataHelpers_[sourceName] = new PollableDataHelper(
                observerMethodName, this.sendGetNetInfo.bind(this, sourceName));
        },
    };

    /**
     * This is a helper class used by BrowserBridge, to keep track of:
     *   - the list of observers interested in some piece of data.
     *   - the last known value of that piece of data.
     *   - the name of the callback method to invoke on observers.
     *   - the update function.
     * @constructor
     */
    function PollableDataHelper(observerMethodName, startUpdateFunction) {
        this.observerMethodName_ = observerMethodName;
        this.startUpdate = startUpdateFunction;
        this.observerInfos_ = [];
    }

    PollableDataHelper.prototype = {
        getObserverMethodName: function() {
            return this.observerMethodName_;
        },

        isObserver: function(object) {
            for (var i = 0; i < this.observerInfos_.length; i++) {
                if (this.observerInfos_[i].observer === object)
                    return true;
            }
            return false;
        },

        /**
         * If |ignoreWhenUnchanged| is true, we won't send data again until it
         * changes.
         */
        addObserver: function(observer, ignoreWhenUnchanged) {
            this.observerInfos_.push(new ObserverInfo(observer, ignoreWhenUnchanged));
        },

        removeObserver: function(observer) {
            for (var i = 0; i < this.observerInfos_.length; i++) {
                if (this.observerInfos_[i].observer === observer) {
                    this.observerInfos_.splice(i, 1);
                    return;
                }
            }
        },

        /**
         * Helper function to handle calling all the observers, but ONLY if the data
         * has actually changed since last time or the observer has yet to receive
         * any data. This is used for data we received from browser on an update
         * loop.
         */
        update: function(data) {
            var prevData = this.currentData_;
            var changed = false;

            // If the data hasn't changed since last time, will only need to notify
            // observers that have not yet received any data.
            if (!prevData || JSON.stringify(prevData) != JSON.stringify(data)) {
                changed = true;
                this.currentData_ = data;
            }

            // Notify the observers of the change, as needed.
            for (var i = 0; i < this.observerInfos_.length; i++) {
                var observerInfo = this.observerInfos_[i];
                if (changed || !observerInfo.hasReceivedData ||
                    !observerInfo.ignoreWhenUnchanged) {
                    observerInfo.observer[this.observerMethodName_](this.currentData_);
                    observerInfo.hasReceivedData = true;
                }
            }
        },

        /**
         * Returns true if one of the observers actively wants the data
         * (i.e. is visible).
         */
        hasActiveObserver: function() {
            for (var i = 0; i < this.observerInfos_.length; i++) {
                if (this.observerInfos_[i].observer.isActive())
                    return true;
            }
            return false;
        }
    };

    /**
     * This is a helper class used by PollableDataHelper, to keep track of
     * each observer and whether or not it has received any data.  The
     * latter is used to make sure that new observers get sent data on the
     * update following their creation.
     * @constructor
     */
    function ObserverInfo(observer, ignoreWhenUnchanged) {
        this.observer = observer;
        this.hasReceivedData = false;
        this.ignoreWhenUnchanged = ignoreWhenUnchanged;
    }

    /**
     * This is a helper class used by BrowserBridge to send data to
     * a callback once data from all polls has been received.
     *
     * It works by keeping track of how many polling functions have
     * yet to receive data, and recording the data as it it received.
     *
     * @constructor
     */
    function UpdateAllObserver(callback, pollableDataHelpers) {
        this.callback_ = callback;
        this.observingCount_ = 0;
        this.updatedData_ = {};

        for (var name in pollableDataHelpers) {
            ++this.observingCount_;
            var helper = pollableDataHelpers[name];
            helper.addObserver(this);
            this[helper.getObserverMethodName()] =
                this.onDataReceived_.bind(this, helper, name);
        }
    }

    UpdateAllObserver.prototype = {
        isActive: function() {
            return true;
        },

        onDataReceived_: function(helper, name, data) {
            helper.removeObserver(this);
            --this.observingCount_;
            this.updatedData_[name] = data;
            if (this.observingCount_ == 0)
                this.callback_(this.updatedData_);
        }
    };

    return BrowserBridge;
})();

// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var EventsTracker = (function() {
    'use strict';

    /**
     * This class keeps track of all NetLog events.
     * It receives events from the browser and when loading a log file, and passes
     * them on to all its observers.
     *
     * @constructor
     */
    function EventsTracker() {
        assertFirstConstructorCall(EventsTracker);

        this.capturedEvents_ = [];
        this.observers_ = [];

        // Controls how large |capturedEvents_| can grow.
        this.softLimit_ = Infinity;
        this.hardLimit_ = Infinity;
    }

    cr.addSingletonGetter(EventsTracker);

    EventsTracker.prototype = {
        /**
         * Returns a list of all captured events.
         */
        getAllCapturedEvents: function() {
            return this.capturedEvents_;
        },

        /**
         * Returns the number of events that were captured.
         */
        getNumCapturedEvents: function() {
            return this.capturedEvents_.length;
        },

        /**
         * Deletes all the tracked events, and notifies any observers.
         */
        deleteAllLogEntries: function() {
            timeutil.clearBaseTime();
            this.capturedEvents_ = [];
            for (var i = 0; i < this.observers_.length; ++i)
                this.observers_[i].onAllLogEntriesDeleted();
        },

        /**
         * Adds captured events, and broadcasts them to any observers.
         */
        addLogEntries: function(logEntries) {
            // When reloading a page, it's possible to receive events before
            // Constants.  Discard those events, as they can cause the fake
            // "REQUEST_ALIVE" events for pre-existing requests not be the first
            // events for those requests.
            if (Constants == null)
                return;
            // This can happen when loading logs with no events.
            if (!logEntries.length)
                return;

            if (!timeutil.isBaseTimeSet()) {
                timeutil.setBaseTime(
                    timeutil.convertTimeTicksToTime(logEntries[0].time));
            }

            this.capturedEvents_ = this.capturedEvents_.concat(logEntries);
            for (var i = 0; i < this.observers_.length; ++i) {
                this.observers_[i].onReceivedLogEntries(logEntries);
            }

            // Check that we haven't grown too big. If so, toss out older events.
            if (this.getNumCapturedEvents() > this.hardLimit_) {
                var originalEvents = this.capturedEvents_;
                this.deleteAllLogEntries();
                // Delete the oldest events until we reach the soft limit.
                originalEvents.splice(0, originalEvents.length - this.softLimit_);
                this.addLogEntries(originalEvents);
            }
        },

        /**
         * Adds a listener of log entries. |observer| will be called back when new
         * log data arrives or all entries are deleted:
         *
         *   observer.onReceivedLogEntries(entries)
         *   observer.onAllLogEntriesDeleted()
         */
        addLogEntryObserver: function(observer) {
            this.observers_.push(observer);
        },

        /**
         * Set bounds on the maximum number of events that will be tracked. This
         * helps to bound the total amount of memory usage, since otherwise
         * long-running capture sessions can exhaust the renderer's memory and
         * crash.
         *
         * Once |hardLimit| number of events have been captured we do a garbage
         * collection and toss out old events, bringing our count down to
         * |softLimit|.
         *
         * To log observers this will look like all the events got deleted, and
         * then subsequently a bunch of new events were received. In other words, it
         * behaves the same as if the user had simply started logging a bit later
         * in time!
         */
        setLimits: function(softLimit, hardLimit) {
            if (hardLimit != Infinity && softLimit >= hardLimit)
                throw 'hardLimit must be greater than softLimit';

            this.softLimit_ = softLimit;
            this.hardLimit_ = hardLimit;
        }
    };

    return EventsTracker;
})();

// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var SourceTracker = (function() {
    'use strict';

    /**
     * This class keeps track of all NetLog events, grouped into per-source
     * streams. It receives events from EventsTracker, and passes
     * them on to all its observers.
     *
     * @constructor
     */
    function SourceTracker() {
        assertFirstConstructorCall(SourceTracker);

        // Observers that only want to receive lists of updated SourceEntries.
        this.sourceEntryObservers_ = [];

        // True when times should be displayed as milliseconds since the first
        // event, as opposed to milliseconds since January 1, 1970.
        this.useRelativeTimes_ = true;

        this.clearEntries_();

        EventsTracker.getInstance().addLogEntryObserver(this);
    }

    cr.addSingletonGetter(SourceTracker);

    SourceTracker.prototype = {
        /**
         * Clears all log entries and SourceEntries and related state.
         */
        clearEntries_: function() {
            // Used for sorting entries with automatically assigned IDs.
            this.maxReceivedSourceId_ = 0;

            // Next unique id to be assigned to a log entry without a source.
            // Needed to identify associated GUI elements, etc.
            this.nextSourcelessEventId_ = -1;

            // Ordered list of log entries.  Needed to maintain original order when
            // generating log dumps
            this.capturedEvents_ = [];

            this.sourceEntries_ = {};
        },

        /**
         * Returns a list of all SourceEntries.
         */
        getAllSourceEntries: function() {
            return this.sourceEntries_;
        },

        /**
         * Returns the description of the specified SourceEntry, or an empty string
         * if it doesn't exist.
         */
        getDescription: function(id) {
            var entry = this.getSourceEntry(id);
            if (entry)
                return entry.getDescription();
            return '';
        },

        /**
         * Returns the specified SourceEntry.
         */
        getSourceEntry: function(id) {
            return this.sourceEntries_[id];
        },

        /**
         * Sends each entry to all observers and updates |capturedEvents_|.
         * Also assigns unique ids to log entries without a source.
         */
        onReceivedLogEntries: function(logEntries) {
            // List source entries with new log entries.  Sorted chronologically, by
            // first new log entry.
            var updatedSourceEntries = [];

            var updatedSourceEntryIdMap = {};

            for (var e = 0; e < logEntries.length; ++e) {
                var logEntry = logEntries[e];

                // Assign unique ID, if needed.
                // TODO(mmenke):  Remove this, and all other code to handle 0 source
                //                IDs when M19 hits stable.
                if (logEntry.source.id == 0) {
                    logEntry.source.id = this.nextSourcelessEventId_;
                    --this.nextSourcelessEventId_;
                } else if (this.maxReceivedSourceId_ < logEntry.source.id) {
                    this.maxReceivedSourceId_ = logEntry.source.id;
                }

                // Create/update SourceEntry object.
                var sourceEntry = this.sourceEntries_[logEntry.source.id];
                if (!sourceEntry) {
                    sourceEntry = new SourceEntry(logEntry, this.maxReceivedSourceId_);
                    this.sourceEntries_[logEntry.source.id] = sourceEntry;
                } else {
                    sourceEntry.update(logEntry);
                }

                // Add to updated SourceEntry list, if not already in it.
                if (!updatedSourceEntryIdMap[logEntry.source.id]) {
                    updatedSourceEntryIdMap[logEntry.source.id] = sourceEntry;
                    updatedSourceEntries.push(sourceEntry);
                }
            }

            this.capturedEvents_ = this.capturedEvents_.concat(logEntries);
            for (var i = 0; i < this.sourceEntryObservers_.length; ++i) {
                this.sourceEntryObservers_[i].onSourceEntriesUpdated(
                    updatedSourceEntries);
            }
        },

        /**
         * Called when all log events have been deleted.
         */
        onAllLogEntriesDeleted: function() {
            this.clearEntries_();
            for (var i = 0; i < this.sourceEntryObservers_.length; ++i)
                this.sourceEntryObservers_[i].onAllSourceEntriesDeleted();
        },

        /**
         * Sets the value of |useRelativeTimes_| and informs log observers
         * of the change.
         */
        setUseRelativeTimes: function(useRelativeTimes) {
            this.useRelativeTimes_ = useRelativeTimes;
            for (var i = 0; i < this.sourceEntryObservers_.length; ++i) {
                if (this.sourceEntryObservers_[i].onUseRelativeTimesChanged)
                    this.sourceEntryObservers_[i].onUseRelativeTimesChanged();
            }
        },

        /**
         * Returns true if times should be displayed as milliseconds since the first
         * event.
         */
        getUseRelativeTimes: function() {
            return this.useRelativeTimes_;
        },

        /**
         * Adds a listener of SourceEntries. |observer| will be called back when
         * SourceEntries are added or modified or source entries are deleted.
         *
         *   observer.onSourceEntriesUpdated(sourceEntries)
         *   observer.onAllSourceEntriesDeleted()
         */
        addSourceEntryObserver: function(observer) {
            this.sourceEntryObservers_.push(observer);
        }
    };

    return SourceTracker;
})();

// // Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * This view implements a vertically split display with a draggable divider.
 *
 *                  <<-- sizer -->>
 *
 *  +----------------------++----------------+
 *  |                      ||                |
 *  |                      ||                |
 *  |                      ||                |
 *  |                      ||                |
 *  |       leftView       ||   rightView    |
 *  |                      ||                |
 *  |                      ||                |
 *  |                      ||                |
 *  |                      ||                |
 *  |                      ||                |
 *  +----------------------++----------------+
 *
 * @param {!View} leftView The widget to position on the left.
 * @param {!View} rightView The widget to position on the right.
 * @param {!DivView} sizerView The widget that will serve as draggable divider.
 */
var ResizableVerticalSplitView = (function() {
    'use strict';

    // Minimum width to size panels to, in pixels.
    var MIN_PANEL_WIDTH = 50;

    // We inherit from View.
    var superClass = View;

    /**
     * @constructor
     */
    function ResizableVerticalSplitView(leftView, rightView, sizerView) {
        // Call superclass's constructor.
        superClass.call(this);

        this.leftView_ = leftView;
        this.rightView_ = rightView;
        this.sizerView_ = sizerView;

        this.mouseDragging_ = false;
        this.touchDragging_ = false;

        // Setup the "sizer" so it can be dragged left/right to reposition the
        // vertical split.  The start event must occur within the sizer's node,
        // but subsequent events may occur anywhere.
        var node = sizerView.getNode();
        node.addEventListener('mousedown', this.onMouseDragSizerStart_.bind(this));
        window.addEventListener('mousemove', this.onMouseDragSizer_.bind(this));
        window.addEventListener('mouseup', this.onMouseDragSizerEnd_.bind(this));

        node.addEventListener('touchstart', this.onTouchDragSizerStart_.bind(this));
        window.addEventListener('touchmove', this.onTouchDragSizer_.bind(this));
        window.addEventListener('touchend', this.onTouchDragSizerEnd_.bind(this));
        window.addEventListener(
            'touchcancel', this.onTouchDragSizerEnd_.bind(this));
    }

    ResizableVerticalSplitView.prototype = {
        // Inherit the superclass's methods.
        __proto__: superClass.prototype,

        /**
         * Sets the width of the left view.
         * @param {Integer} px The number of pixels
         */
        setLeftSplit: function(px) {
            this.leftSplit_ = px;
        },

        /**
         * Repositions all of the elements to fit the window.
         */
        setGeometry: function(left, top, width, height) {
            superClass.prototype.setGeometry.call(this, left, top, width, height);

            // If this is the first setGeometry(), initialize the split point at 50%.
            if (!this.leftSplit_)
                this.leftSplit_ = parseInt((width / 2).toFixed(0));

            // Calculate the horizontal split points.
            var leftboxWidth = this.leftSplit_;
            var sizerWidth = this.sizerView_.getWidth();
            var rightboxWidth = width - (leftboxWidth + sizerWidth);

            // Don't let the right pane get too small.
            if (rightboxWidth < MIN_PANEL_WIDTH) {
                rightboxWidth = MIN_PANEL_WIDTH;
                leftboxWidth = width - (sizerWidth + rightboxWidth);
            }

            // Position the boxes using calculated split points.
            this.leftView_.setGeometry(left, top, leftboxWidth, height);
            this.sizerView_.setGeometry(
                this.leftView_.getRight(), top, sizerWidth, height);
            this.rightView_.setGeometry(
                this.sizerView_.getRight(), top, rightboxWidth, height);
        },

        show: function(isVisible) {
            superClass.prototype.show.call(this, isVisible);
            this.leftView_.show(isVisible);
            this.sizerView_.show(isVisible);
            this.rightView_.show(isVisible);
        },

        /**
         * Called once the sizer is clicked on. Starts moving the sizer in response
         * to future mouse movement.
         */
        onMouseDragSizerStart_: function(event) {
            this.mouseDragging_ = true;
            event.preventDefault();
        },

        /**
         * Called when the mouse has moved.
         */
        onMouseDragSizer_: function(event) {
            if (!this.mouseDragging_)
                return;
            // If dragging has started, move the sizer.
            this.onDragSizer_(event.pageX);
            event.preventDefault();
        },

        /**
         * Called once the mouse has been released.
         */
        onMouseDragSizerEnd_: function(event) {
            if (!this.mouseDragging_)
                return;
            // Dragging is over.
            this.mouseDragging_ = false;
            event.preventDefault();
        },

        /**
         * Called when the user touches the sizer.  Starts moving the sizer in
         * response to future touch events.
         */
        onTouchDragSizerStart_: function(event) {
            this.touchDragging_ = true;
            event.preventDefault();
        },

        /**
         * Called when the mouse has moved after dragging started.
         */
        onTouchDragSizer_: function(event) {
            if (!this.touchDragging_)
                return;
            // If dragging has started, move the sizer.
            this.onDragSizer_(event.touches[0].pageX);
            event.preventDefault();
        },

        /**
         * Called once the user stops touching the screen.
         */
        onTouchDragSizerEnd_: function(event) {
            if (!this.touchDragging_)
                return;
            // Dragging is over.
            this.touchDragging_ = false;
            event.preventDefault();
        },

        /**
         * Common code used for both mouse and touch dragging.
         */
        onDragSizer_: function(pageX) {
            // Convert from page coordinates, to view coordinates.
            this.leftSplit_ = (pageX - this.getLeft());

            // Avoid shrinking the left box too much.
            this.leftSplit_ = Math.max(this.leftSplit_, MIN_PANEL_WIDTH);
            // Avoid shrinking the right box too much.
            this.leftSplit_ =
                Math.min(this.leftSplit_, this.getWidth() - MIN_PANEL_WIDTH);

            // Force a layout with the new |leftSplit_|.
            this.setGeometry(
                this.getLeft(), this.getTop(), this.getWidth(), this.getHeight());
        },
    };

    return ResizableVerticalSplitView;
})();

// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Dictionary of constants (Initialized soon after loading by data from browser,
 * updated on load log).  The *Types dictionaries map strings to numeric IDs,
 * while the *TypeNames are the other way around.
 */
var EventType = null;
var EventTypeNames = null;
var EventPhase = null;
var EventSourceType = null;
var EventSourceTypeNames = null;
var ClientInfo = null;
var NetError = null;
var QuicError = null;
var QuicRstStreamError = null;
var LoadFlag = null;
var CertStatusFlag = null;
var LoadState = null;
var AddressFamily = null;
var DataReductionProxyBypassEventType = null;

/**
 * Dictionary of all constants, used for saving log files.
 */
var Constants = null;

/**
 * Object to communicate between the renderer and the browser.
 * @type {!BrowserBridge}
 */
var g_browser = null;

/**
 * This class is the root view object of the page.  It owns all the other
 * views, and manages switching between them.  It is also responsible for
 * initializing the views and the BrowserBridge.
 */
var MainView = (function() {
    'use strict';

    // We inherit from WindowView
    var superClass = WindowView;

    /**
     * Main entry point. Called once the page has loaded.
     *  @constructor
     */
    function MainView() {
        assertFirstConstructorCall(MainView);

        if (hasTouchScreen())
            document.body.classList.add('touch');

        // This must be initialized before the tabs, so they can register as
        // observers.
        g_browser = BrowserBridge.getInstance();

        // This must be the first constants observer, so other constants observers
        // can safely use the globals, rather than depending on walking through
        // the constants themselves.
        g_browser.addConstantsObserver(new ConstantsObserver());

        // Create the tab switcher.
        this.initTabs_();

        // Cut out a small vertical strip at the top of the window, to display
        // a high level status (i.e. if we are capturing events, or displaying a
        // log file). Below it we will position the main tabs and their content
        // area.
        this.topBarView_ = TopBarView.getInstance(this);
        var verticalSplitView =
            new VerticalSplitView(this.topBarView_, this.tabSwitcher_);

        superClass.call(this, verticalSplitView);

        // Trigger initial layout.
        this.resetGeometry();

        window.onhashchange = this.onUrlHashChange_.bind(this);

        // Select the initial view based on the current URL.
        window.onhashchange();

        // Tell the browser that we are ready to start receiving log events.
        this.topBarView_.switchToSubView('capture');
        g_browser.sendReady();
    }

    cr.addSingletonGetter(MainView);

    // Tracks if we're viewing a loaded log file, so views can behave
    // appropriately.  Global so safe to call during construction.
    var isViewingLoadedLog = false;

    MainView.isViewingLoadedLog = function() {
        return isViewingLoadedLog;
    };

    MainView.prototype = {
        // Inherit the superclass's methods.
        __proto__: superClass.prototype,

        // This is exposed both so the log import/export code can enumerate all the
        // tabs, and for testing.
        tabSwitcher: function() {
            return this.tabSwitcher_;
        },

        /**
         * Prevents receiving/sending events to/from the browser, so loaded data
         * will not be mixed with current Chrome state.  Also hides any interactive
         * HTML elements that send messages to the browser.  Cannot be undone
         * without reloading the page.  Must be called before passing loaded data
         * to the individual views.
         *
         * @param {string} opt_fileName The name of the log file that has been
         *     loaded, if we're loading a log file.
         */
        onLoadLog: function(opt_fileName) {
            isViewingLoadedLog = true;

            this.stopCapturing();
            if (opt_fileName != undefined) {
                // If there's a file name, a log file was loaded, so swap out the status
                // bar to indicate we're no longer capturing events.
                this.topBarView_.switchToSubView('loaded').setFileName(opt_fileName);
            } else {
                // Otherwise, the "Stop Capturing" button was presumably pressed.
                // Don't disable hiding cookies, so created log dumps won't have them,
                // unless the user toggles the option.
                this.topBarView_.switchToSubView('halted');
            }
        },

        switchToViewOnlyMode: function() {
            // Since this won't be dumped to a file, we don't want to remove
            // cookies and credentials.
            log_util.createLogDumpAsync('', log_util.loadLogFile, false);
        },

        stopCapturing: function() {
            g_browser.disable();
            var sheet = document.createElement('style');
            sheet.type = 'text/css';
            sheet.appendChild(document.createTextNode(
                '.hide-when-not-capturing { display: none; }'));
            document.head.appendChild(sheet);
        },

        initTabs_: function() {
            this.tabIdToHash_ = {};
            this.hashToTabId_ = {};

            this.tabSwitcher_ = new TabSwitcherView(this.onTabSwitched_.bind(this));

            // Helper function to add a tab given the class for a view singleton.
            var addTab = function(viewClass) {
                var tabId = viewClass.TAB_ID;
                var tabHash = viewClass.TAB_HASH;
                var tabName = viewClass.TAB_NAME;
                var view = viewClass.getInstance();

                if (!tabId || !view || !tabHash || !tabName) {
                    throw Error('Invalid view class for tab');
                }

                if (tabHash.charAt(0) != '#') {
                    throw Error('Tab hashes must start with a #');
                }

                this.tabSwitcher_.addTab(tabId, view, tabName, tabHash);
                this.tabIdToHash_[tabId] = tabHash;
                this.hashToTabId_[tabHash] = tabId;
            }.bind(this);

            // Populate the main tabs.  Even tabs that don't contain information for
            // the running OS should be created, so they can load log dumps from other
            // OSes.
            addTab(CaptureView);
            addTab(ImportView);
            addTab(ProxyView);
            addTab(EventsView);
            addTab(TimelineView);
            addTab(DnsView);
            addTab(SocketsView);
            addTab(AltSvcView);
            addTab(SpdyView);
            addTab(QuicView);
            addTab(ReportingView);
            addTab(HttpCacheView);
            addTab(ModulesView);
            addTab(DomainSecurityPolicyView);
            addTab(BandwidthView);
            addTab(PrerenderView);
            addTab(CrosView);

            this.tabSwitcher_.showTabLink(CrosView.TAB_ID, cr.isChromeOS);
        },

        /**
         * This function is called by the tab switcher when the current tab has been
         * changed. It will update the current URL to reflect the new active tab,
         * so the back can be used to return to previous view.
         */
        onTabSwitched_: function(oldTabId, newTabId) {
            // Update data needed by newly active tab, as it may be
            // significantly out of date.
            if (g_browser)
                g_browser.checkForUpdatedInfo();

            // Change the URL to match the new tab.

            var newTabHash = this.tabIdToHash_[newTabId];
            var parsed = parseUrlHash_(window.location.hash);
            if (parsed.tabHash != newTabHash) {
                window.location.hash = newTabHash;
            }
        },

        onUrlHashChange_: function() {
            var parsed = parseUrlHash_(window.location.hash);

            if (!parsed)
                return;

            if (parsed.tabHash == '#export') {
                // The #export tab was removed in M60, after having been
                // deprecated since M58. In case anyone *still* has URLs
                // bookmarked to this, inform them and redirect.
                // TODO(eroman): Delete this around M62.
                parsed.tabHash = undefined;

                // Done on a setTimeout so it doesn't block the initial
                // page load (confirm() is synchronous).
                setTimeout(() => {
                    var navigateToNetExport = confirm(
                        '#export was removed\nDo you want to navigate to ' +
                        'chrome://net-export/ instead?');
                if (navigateToNetExport) {
                    window.location.href = 'chrome://net-export';
                    return;
                }
            });
            }

            if (!parsed.tabHash) {
                // Default to the events tab.
                parsed.tabHash = EventsView.TAB_HASH;
            }

            var tabId = this.hashToTabId_[parsed.tabHash];

            if (tabId) {
                this.tabSwitcher_.switchToTab(tabId);
                if (parsed.parameters) {
                    var view = this.tabSwitcher_.getTabView(tabId);
                    view.setParameters(parsed.parameters);
                }
            }
        },

    };

    /**
     * Takes the current hash in form of "#tab&param1=value1&param2=value2&..."
     * and parses it into a dictionary.
     *
     * Parameters and values are decoded with decodeURIComponent().
     */
    function parseUrlHash_(hash) {
        var parameters = hash.split('&');

        var tabHash = parameters[0];
        if (tabHash == '' || tabHash == '#') {
            tabHash = undefined;
        }

        // Split each string except the first around the '='.
        var paramDict = null;
        for (var i = 1; i < parameters.length; i++) {
            var paramStrings = parameters[i].split('=');
            if (paramStrings.length != 2)
                continue;
            if (paramDict == null)
                paramDict = {};
            var key = decodeURIComponent(paramStrings[0]);
            var value = decodeURIComponent(paramStrings[1]);
            paramDict[key] = value;
        }

        return {tabHash: tabHash, parameters: paramDict};
    }

    return MainView;
})();

function ConstantsObserver() {}

/**
 * Loads all constants from |constants|.  On failure, global dictionaries are
 * not modifed.
 * @param {Object} receivedConstants The map of received constants.
 */
ConstantsObserver.prototype.onReceivedConstants = function(receivedConstants) {
    if (!areValidConstants(receivedConstants))
        return;

    Constants = receivedConstants;

    EventType = Constants.logEventTypes;
    EventTypeNames = makeInverseMap(EventType);
    EventPhase = Constants.logEventPhase;
    EventSourceType = Constants.logSourceType;
    EventSourceTypeNames = makeInverseMap(EventSourceType);
    ClientInfo = Constants.clientInfo;
    LoadFlag = Constants.loadFlag;
    NetError = Constants.netError;
    QuicError = Constants.quicError;
    QuicRstStreamError = Constants.quicRstStreamError;
    AddressFamily = Constants.addressFamily;
    LoadState = Constants.loadState;
    DataReductionProxyBypassEventType =
        Constants.dataReductionProxyBypassEventType;
    DataReductionProxyBypassActionType =
        Constants.dataReductionProxyBypassActionType;
    // certStatusFlag may not be present when loading old log Files
    if (typeof(Constants.certStatusFlag) == 'object')
        CertStatusFlag = Constants.certStatusFlag;
    else
        CertStatusFlag = {};

    timeutil.setTimeTickOffset(Constants.timeTickOffset);
};

/**
 * Returns true if it's given a valid-looking constants object.
 * @param {Object} receivedConstants The received map of constants.
 * @return {boolean} True if the |receivedConstants| object appears valid.
 */
function areValidConstants(receivedConstants) {
    return typeof(receivedConstants) == 'object' &&
        typeof(receivedConstants.logEventTypes) == 'object' &&
        typeof(receivedConstants.clientInfo) == 'object' &&
        typeof(receivedConstants.logEventPhase) == 'object' &&
        typeof(receivedConstants.logSourceType) == 'object' &&
        typeof(receivedConstants.loadFlag) == 'object' &&
        typeof(receivedConstants.netError) == 'object' &&
        typeof(receivedConstants.addressFamily) == 'object' &&
        typeof(receivedConstants.timeTickOffset) == 'string' &&
        typeof(receivedConstants.logFormatVersion) == 'number';
}

/**
 * Returns the name for netError.
 *
 * Example: netErrorToString(-105) should return
 * "ERR_NAME_NOT_RESOLVED".
 * @param {number} netError The net error code.
 * @return {string} The name of the given error.
 */
function netErrorToString(netError) {
    return getKeyWithValue(NetError, netError);
}

/**
 * Returns the name for quicError.
 *
 * Example: quicErrorToString(25) should return
 * "TIMED_OUT".
 * @param {number} quicError The QUIC error code.
 * @return {string} The name of the given error.
 */
function quicErrorToString(quicError) {
    return getKeyWithValue(QuicError, quicError);
}

/**
 * Returns the name for quicRstStreamError.
 *
 * Example: quicRstStreamErrorToString(3) should return
 * "BAD_APPLICATION_PAYLOAD".
 * @param {number} quicRstStreamError The QUIC RST_STREAM error code.
 * @return {string} The name of the given error.
 */
function quicRstStreamErrorToString(quicRstStreamError) {
    return getKeyWithValue(QuicRstStreamError, quicRstStreamError);
}

/**
 * Returns a string representation of |family|.
 * @param {number} family An AddressFamily
 * @return {string} A representation of the given family.
 */
function addressFamilyToString(family) {
    var str = getKeyWithValue(AddressFamily, family);
    // All the address family start with ADDRESS_FAMILY_*.
    // Strip that prefix since it is redundant and only clutters the output.
    return str.replace(/^ADDRESS_FAMILY_/, '');
}

// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var timeutil = (function() {
    'use strict';

    /**
     * Offset needed to convert event times to Date objects.
     * Updated whenever constants are loaded.
     */
    var timeTickOffset = 0;

    /**
     * The time of the first observed event.  Used for more friendly time display.
     */
    var baseTime = 0;

    /**
     * Sets the offset used to convert tick counts to dates.
     */
    function setTimeTickOffset(offset) {
        // Note that the subtraction by 0 is to cast to a number (probably a float
        // since the numbers are big).
        timeTickOffset = offset - 0;
    }

    /**
     * The browser gives us times in terms of "time ticks" in milliseconds.
     * This function converts the tick count to a Javascript "time", which is
     * the UTC time in milliseconds.
     *
     * @param {string} timeTicks A time represented in "time ticks".
     * @return {number} The Javascript time that |timeTicks| represents.
     */
    function convertTimeTicksToTime(timeTicks) {
        return timeTickOffset + (timeTicks - 0);
    }

    /**
     * The browser gives us times in terms of "time ticks" in milliseconds.
     * This function converts the tick count to a Date() object.
     *
     * @param {string} timeTicks A time represented in "time ticks".
     * @return {Date} The time that |timeTicks| represents.
     */
    function convertTimeTicksToDate(timeTicks) {
        return new Date(convertTimeTicksToTime(timeTicks));
    }

    /**
     * Returns the current time.
     *
     * @return {number} Milliseconds since the Unix epoch.
     */
    function getCurrentTime() {
        return Date.now();
    }

    /**
     * Returns the curent time in time ticks.
     *
     * @return {number} Current time, in TimeTicks.
     */
    function getCurrentTimeTicks() {
        return getCurrentTime() - timeTickOffset;
    }

    /**
     * Sets the base time more friendly display.
     *
     * @param {string} firstEventTime The time of the first event, as a Javascript
     *     numeric time.  Other times can be displayed relative to this time.
     */
    function setBaseTime(firstEventTime) {
        baseTime = firstEventTime;
    }

    /**
     * Sets the base time more friendly display.
     *
     * @return {number} Time set by setBaseTime, or 0 if no time has been set.
     */
    function getBaseTime() {
        return baseTime;
    }

    /**
     * Clears the base time, so isBaseTimeSet() returns 0.
     */
    function clearBaseTime() {
        baseTime = 0;
    }

    /**
     * Returns true if the base time has been initialized.
     *
     * @return {bool} True if the base time is set.
     */
    function isBaseTimeSet() {
        return baseTime != 0;
    }

    /**
     * Takes in a "time ticks" and returns it as a time since the base time, in
     * milliseconds.
     *
     * @param {string} timeTicks A time represented in "time ticks".
     * @return {number} Milliseconds since the base time.
     */
    function convertTimeTicksToRelativeTime(timeTicks) {
        return convertTimeTicksToTime(timeTicks) - baseTime;
    }

    /**
     * Adds an HTML representation of |date| to |parentNode|.
     *
     * @param {DomNode} parentNode The node that will contain the new node.
     * @param {Date} date The date to be displayed.
     * @return {DomNode} The new node containing the date/time.
     */
    function addNodeWithDate(parentNode, date) {
        var span = addNodeWithText(parentNode, 'span', dateToString(date));
        span.title = 't=' + date.getTime();
        return span;
    }

    /**
     * Returns a string representation of |date|.
     *
     * @param {Date} date The date to be represented.
     * @return {string} A string representation of |date|.
     */
    function dateToString(date) {
        var dateStr = date.getFullYear() + '-' + zeroPad_(date.getMonth() + 1, 2) +
            '-' + zeroPad_(date.getDate(), 2);

        var timeStr = zeroPad_(date.getHours(), 2) + ':' +
            zeroPad_(date.getMinutes(), 2) + ':' + zeroPad_(date.getSeconds(), 2) +
            '.' + zeroPad_(date.getMilliseconds(), 3);

        return dateStr + ' ' + timeStr;
    }

    /**
     * Prefixes enough zeros to |num| so that it has length |len|.
     * @param {number} num The number to be padded.
     * @param {number} len The desired length of the returned string.
     * @return {string} The zero-padded representation of |num|.
     */
    function zeroPad_(num, len) {
        var str = num + '';
        while (str.length < len)
            str = '0' + str;
        return str;
    }

    return {
        setTimeTickOffset: setTimeTickOffset,
        convertTimeTicksToTime: convertTimeTicksToTime,
        convertTimeTicksToDate: convertTimeTicksToDate,
        getCurrentTime: getCurrentTime,
        getCurrentTimeTicks: getCurrentTimeTicks,
        setBaseTime: setBaseTime,
        getBaseTime: getBaseTime,
        clearBaseTime: clearBaseTime,
        isBaseTimeSet: isBaseTimeSet,
        convertTimeTicksToRelativeTime: convertTimeTicksToRelativeTime,
        addNodeWithDate: addNodeWithDate,
        dateToString: dateToString,
    };
})();

// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

log_util = (function() {
    'use strict';

    /**
     * Creates a new log dump.  |events| is a list of all events, |polledData| is
     * an object containing the results of each poll, |tabData| is an object
     * containing data for individual tabs, |date| is the time the dump was
     * created, as a formatted string.
     *
     * Returns the new log dump as an object.  Resulting object may have a null
     * |numericDate|.
     *
     * TODO(eroman): Use javadoc notation for these parameters.
     *
     * Log dumps are just JSON objects containing five values:
     *
     *   |userComments| User-provided notes describing what this dump file is
     *                  about.
     *   |constants| needed to interpret the data.  This also includes some
     *               browser state information.
     *   |events| from the NetLog.
     *   |polledData| from each PollableDataHelper available on the source OS.
     *   |tabData| containing any tab-specific state that's not present in
     *             |polledData|.
     *
     * |polledData| and |tabData| may be empty objects, or may be missing data for
     * tabs not present on the OS the log is from.
     */
    function createLogDump(
        userComments, constants, events, polledData, tabData, numericDate) {
        var logDump = {
            'userComments': userComments,
            'constants': constants,
            'events': events,
            'polledData': polledData,
            'tabData': tabData
        };

        // Not technically client info, but it's used at the same point in the code.
        if (numericDate && constants.clientInfo) {
            constants.clientInfo.numericDate = numericDate;
        }

        return logDump;
    }

    /**
     * Creates a full log dump using |polledData| and the return value of each
     * tab's saveState function and passes it to |callback|.
     */
    function onUpdateAllCompleted(userComments, callback, polledData) {
        var logDump = createLogDump(
            userComments, Constants,
            EventsTracker.getInstance().getAllCapturedEvents(), polledData,
            getTabData_(), timeutil.getCurrentTime());
        callback(JSON.stringify(logDump));
    }

    /**
     * Called to create a new log dump.  Must not be called once a dump has been
     * loaded.  Once a log dump has been created, |callback| is passed the dumped
     * text as a string.
     */
    function createLogDumpAsync(userComments, callback) {
        g_browser.updateAllInfo(
            onUpdateAllCompleted.bind(null, userComments, callback));
    }

    /**
     * Gather any tab-specific state information prior to creating a log dump.
     */
    function getTabData_() {
        var tabData = {};
        var tabSwitcher = MainView.getInstance().tabSwitcher();
        var tabIdToView = tabSwitcher.getAllTabViews();
        for (var tabId in tabIdToView) {
            var view = tabIdToView[tabId];
            if (view.saveState)
                tabData[tabId] = view.saveState();
        }
    }

    /**
     * Loads a full log dump.  Returns a string containing a log of the load.
     * |opt_fileName| should always be given when loading from a file, instead of
     * from a log dump generated in-memory.
     * The process goes like this:
     * 1)  Load constants.  If this fails, or the version number can't be handled,
     *     abort the load.  If this step succeeds, the load cannot be aborted.
     * 2)  Clear all events.  Any event observers are informed of the clear as
     *     normal.
     * 3)  Call onLoadLogStart(polledData, tabData) for each view with an
     *     onLoadLogStart function.  This allows tabs to clear any extra state
     *     that would affect the next step.  |polledData| contains the data polled
     *     for all helpers, but |tabData| contains only the data from that
     *     specific tab.
     * 4)  Add all events from the log file.
     * 5)  Call onLoadLogFinish(polledData, tabData) for each view with an
     *     onLoadLogFinish function.  The arguments are the same as in step 3.  If
     *     there is no onLoadLogFinish function, it throws an exception, or it
     *     returns false instead of true, the data dump is assumed to contain no
     *     valid data for the tab, so the tab is hidden.  Otherwise, the tab is
     *     shown.
     */
    function loadLogDump(logDump, opt_fileName) {
        // Perform minimal validity check, and abort if it fails.
        if (typeof(logDump) != 'object')
            return 'Load failed.  Top level JSON data is not an object.';

        // String listing text summary of load errors, if any.
        var errorString = '';

        if (!areValidConstants(logDump.constants))
            errorString += 'Invalid constants object.\n';
        if (typeof(logDump.events) != 'object')
            errorString += 'NetLog events missing.\n';
        if (typeof(logDump.constants.logFormatVersion) != 'number')
            errorString += 'Invalid version number.\n';

        if (errorString.length > 0)
            return 'Load failed:\n\n' + errorString;

        if (typeof(logDump.polledData) != 'object')
            logDump.polledData = {};
        if (typeof(logDump.tabData) != 'object')
            logDump.tabData = {};

        if (logDump.constants.logFormatVersion != Constants.logFormatVersion) {
            return 'Unable to load different log version.' +
                ' Found ' + logDump.constants.logFormatVersion + ', Expected ' +
                Constants.logFormatVersion;
        }

        g_browser.receivedConstants(logDump.constants);

        // Check for validity of each log entry, and then add the ones that pass.
        // Since the events are kept around, and we can't just hide a single view
        // on a bad event, we have more error checking for them than other data.
        var validEvents = [];
        var numDeprecatedPassiveEvents = 0;
        for (var eventIndex = 0; eventIndex < logDump.events.length; ++eventIndex) {
            var event = logDump.events[eventIndex];
            if (typeof event == 'object' && typeof event.source == 'object' &&
                typeof event.time == 'string' &&
                typeof EventTypeNames[event.type] == 'string' &&
                typeof EventSourceTypeNames[event.source.type] == 'string' &&
                getKeyWithValue(EventPhase, event.phase) != '?') {
                if (event.wasPassivelyCaptured) {
                    // NOTE: Up until Chrome 18, log dumps included "passively captured"
                    // events. These are no longer supported, so skip past them
                    // to avoid confusing the rest of the code.
                    numDeprecatedPassiveEvents++;
                    continue;
                }
                validEvents.push(event);
            }
        }

        // Determine the export date for the loaded log.
        //
        // Dumps created from chrome://net-internals (Chrome 17 - Chrome 59) will
        // have this set in constants.clientInfo.numericDate.
        //
        // However more recent dumping mechanisms (chrome://net-export/ and
        // --log-net-log) write the constants object directly to a file when the
        // dump is *started* so lack this ability.
        //
        // In this case, we will synthesize this field by looking at the timestamp
        // of the last event logged. In practice this works fine since there tend
        // to be lots of events logged.
        //
        // TODO(eroman): Fix the log format / writers to avoid this problem. Dumps
        // *should* contain the time when capturing started, and when capturing
        // ended.
        if (typeof logDump.constants.clientInfo.numericDate != 'number') {
            if (validEvents.length > 0) {
                var lastEvent = validEvents[validEvents.length - 1];
                ClientInfo.numericDate =
                    timeutil.convertTimeTicksToDate(lastEvent.time).getTime();
            } else {
                errorString += 'Can\'t guess export date as there are no events.\n';
                ClientInfo.numericDate = 0;
            }
        }

        // Prevent communication with the browser.  Once the constants have been
        // loaded, it's safer to continue trying to load the log, even in the case
        // of bad data.
        MainView.getInstance().onLoadLog(opt_fileName);

        // Delete all events.  This will also update all logObservers.
        EventsTracker.getInstance().deleteAllLogEntries();

        // Inform all the views that a log file is being loaded, and pass in
        // view-specific saved state, if any.
        var tabSwitcher = MainView.getInstance().tabSwitcher();
        var tabIdToView = tabSwitcher.getAllTabViews();
        for (var tabId in tabIdToView) {
            var view = tabIdToView[tabId];
            view.onLoadLogStart(logDump.polledData, logDump.tabData[tabId]);
        }
        EventsTracker.getInstance().addLogEntries(validEvents);

        var numInvalidEvents = logDump.events.length -
            (validEvents.length + numDeprecatedPassiveEvents);
        if (numInvalidEvents > 0) {
            errorString += 'Unable to load ' + numInvalidEvents +
                ' events, due to invalid data.\n\n';
        }

        if (numDeprecatedPassiveEvents > 0) {
            errorString += 'Discarded ' + numDeprecatedPassiveEvents +
                ' passively collected events. Use an older version of Chrome to' +
                ' load this dump if you want to see them.\n\n';
        }

        // Update all views with data from the file.  Show only those views which
        // successfully load the data.
        for (var tabId in tabIdToView) {
            var view = tabIdToView[tabId];
            var showView = false;
            // The try block eliminates the need for checking every single value
            // before trying to access it.
            try {
                if (view.onLoadLogFinish(
                    logDump.polledData, logDump.tabData[tabId], logDump)) {
                    showView = true;
                }
            } catch (error) {
                errorString +=
                    'Caught error while calling onLoadLogFinish: ' + error + '\n\n';
            }
            tabSwitcher.showTabLink(tabId, showView);
        }

        return errorString + 'Log loaded.';
    }

    /**
     * Loads a log dump from the string |logFileContents|, which can be either a
     * full net-internals dump, or a NetLog dump only.  Returns a string
     * containing a log of the load.
     */
    function loadLogFile(logFileContents, fileName) {
        // Try and parse the log dump as a single JSON string.  If this succeeds,
        // it's most likely a full log dump.  Otherwise, it may be a dump created by
        // --log-net-log.
        var parsedDump = null;
        var errorString = '';
        try {
            parsedDump = JSON.parse(logFileContents);
        } catch (error) {
            try {
                // We may have a --log-net-log=blah log dump.  If so, remove the comma
                // after the final good entry, and add the necessary close brackets.
                var end = Math.max(
                    logFileContents.lastIndexOf(',\n'),
                    logFileContents.lastIndexOf(',\r'));
                if (end != -1) {
                    parsedDump = JSON.parse(logFileContents.substring(0, end) + ']}');
                    errorString += 'Log file truncated.  Events may be missing.\n';
                }
            } catch (error2) {
            }
        }

        if (!parsedDump)
            return 'Unable to parse log dump as JSON file.';
        return errorString + loadLogDump(parsedDump, fileName);
    }

    // Exports.
    return {createLogDumpAsync: createLogDumpAsync, loadLogFile: loadLogFile};
})();

// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * The status view at the top of the page when in capturing mode.
 */
var CaptureStatusView = (function() {
    'use strict';

    // We inherit from DivView.
    var superClass = DivView;

    function CaptureStatusView() {
        superClass.call(this, CaptureStatusView.MAIN_BOX_ID);

        this.getDropdown_().onchange = this.onSelectAction_.bind(this);
        this.getDropdown_().selectedIndex = -1;

        this.capturedEventsCountBox_ =
            $(CaptureStatusView.CAPTURED_EVENTS_COUNT_ID);
        this.updateEventCounts_();

        EventsTracker.getInstance().addLogEntryObserver(this);
    }

    // IDs for special HTML elements in status_view.html
    CaptureStatusView.MAIN_BOX_ID = 'capture-status-view';
    CaptureStatusView.ACTIONS_DROPDOWN_ID = 'capture-status-view-actions';
    CaptureStatusView.CAPTURED_EVENTS_COUNT_ID =
        'capture-status-view-captured-events-count';

    CaptureStatusView.prototype = {
        // Inherit the superclass's methods.
        __proto__: superClass.prototype,

        /**
         * Called whenever new log entries have been received.
         */
        onReceivedLogEntries: function(logEntries) {
            this.updateEventCounts_();
        },

        /**
         * Called whenever all log events are deleted.
         */
        onAllLogEntriesDeleted: function() {
            this.updateEventCounts_();
        },

        /**
         * Updates the counters showing how many events have been captured.
         */
        updateEventCounts_: function() {
            this.capturedEventsCountBox_.textContent =
                EventsTracker.getInstance().getNumCapturedEvents();
        },

        getDropdown_: function() {
            return $(CaptureStatusView.ACTIONS_DROPDOWN_ID);
        },

        onSelectAction_: function() {
            var dropdown = this.getDropdown_();
            var action = dropdown.value;
            dropdown.selectedIndex = -1;

            if (action == 'stop') {
                $(CaptureView.STOP_BUTTON_ID).click();
            } else if (action == 'reset') {
                $(CaptureView.RESET_BUTTON_ID).click();
            } else if (action == 'clear-cache') {
                g_browser.sendClearAllCache();
            } else if (action == 'flush-sockets') {
                g_browser.sendFlushSocketPools();
            } else if (action == 'switch-time-format') {
                var tracker = SourceTracker.getInstance();
                tracker.setUseRelativeTimes(!tracker.getUseRelativeTimes());
            } else {
                throw Error('Unrecognized action: ' + action);
            }
        },
    };

    return CaptureStatusView;
})();

// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * The status view at the top of the page when viewing a loaded dump file.
 */
var LoadedStatusView = (function() {
    'use strict';

    // We inherit from DivView.
    var superClass = DivView;

    function LoadedStatusView() {
        superClass.call(this, LoadedStatusView.MAIN_BOX_ID);
    }

    LoadedStatusView.MAIN_BOX_ID = 'loaded-status-view';
    LoadedStatusView.DUMP_FILE_NAME_ID = 'loaded-status-view-dump-file-name';

    LoadedStatusView.prototype = {
        // Inherit the superclass's methods.
        __proto__: superClass.prototype,

        setFileName: function(fileName) {
            $(LoadedStatusView.DUMP_FILE_NAME_ID).innerText = fileName;
        }
    };

    return LoadedStatusView;
})();

// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * The status view at the top of the page after stopping capturing.
 */
var HaltedStatusView = (function() {
    'use strict';

    // We inherit from DivView.
    var superClass = DivView;

    function HaltedStatusView() {
        superClass.call(this, HaltedStatusView.MAIN_BOX_ID);
    }

    HaltedStatusView.MAIN_BOX_ID = 'halted-status-view';

    HaltedStatusView.prototype = {
        // Inherit the superclass's methods.
        __proto__: superClass.prototype
    };

    return HaltedStatusView;
})();

// // Copyright (c) 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * The status view at the top of the page.  It displays what mode net-internals
 * is in (capturing, viewing only, viewing loaded log), and may have extra
 * information and actions depending on the mode.
 */
var TopBarView = (function() {
    'use strict';

    // We inherit from View.
    var superClass = DivView;

    /**
     * Main entry point. Called once the page has loaded.
     * @constructor
     */
    function TopBarView() {
        assertFirstConstructorCall(TopBarView);

        superClass.call(this, TopBarView.BOX_ID);

        this.nameToSubView_ = {
            capture: new CaptureStatusView(),
            loaded: new LoadedStatusView(),
            halted: new HaltedStatusView()
        };

        this.activeSubView_ = null;
    }

    TopBarView.BOX_ID = 'top-bar-view';

    cr.addSingletonGetter(TopBarView);

    TopBarView.prototype = {
        // Inherit the superclass's methods.
        __proto__: superClass.prototype,

        switchToSubView: function(name) {
            var newSubView = this.nameToSubView_[name];

            if (!newSubView)
                throw Error('Invalid subview name');

            var prevSubView = this.activeSubView_;
            this.activeSubView_ = newSubView;

            if (prevSubView)
                prevSubView.show(false);
            newSubView.show(this.isVisible());

            // Let the subview change the color scheme of the top bar.
            $(TopBarView.BOX_ID).className = name + '-status-view';

            return newSubView;
        },
    };

    return TopBarView;
})();

// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * This view displays information on the host resolver:
 *
 *   - Shows the default address family.
 *   - Shows the current host cache contents.
 *   - Has a button to clear the host cache.
 *   - Shows the parameters used to construct the host cache (capacity, ttl).
 */

// TODO(mmenke):  Add links for each address entry to the corresponding NetLog
//                source.  This could either be done by adding NetLog source ids
//                to cache entries, or tracking sources based on their type and
//                description.  Former is simpler, latter may be useful
//                elsewhere as well.
var DnsView = (function() {
    'use strict';

    // We inherit from DivView.
    var superClass = DivView;

    /**
     *  @constructor
     */
    function DnsView() {
        assertFirstConstructorCall(DnsView);

        // Call superclass's constructor.
        superClass.call(this, DnsView.MAIN_BOX_ID);

        $(DnsView.CLEAR_CACHE_BUTTON_ID).onclick =
            g_browser.sendClearHostResolverCache.bind(g_browser);

        // Register to receive changes to the host resolver info.
        g_browser.addHostResolverInfoObserver(this, false);
    }

    DnsView.TAB_ID = 'tab-handle-dns';
    DnsView.TAB_NAME = 'DNS';
    DnsView.TAB_HASH = '#dns';

    // IDs for special HTML elements in dns_view.html
    DnsView.MAIN_BOX_ID = 'dns-view-tab-content';

    DnsView.INTERNAL_DNS_ENABLED_SPAN_ID = 'dns-view-internal-dns-enabled';
    DnsView.INTERNAL_DNS_INVALID_CONFIG_SPAN_ID =
        'dns-view-internal-dns-invalid-config';
    DnsView.INTERNAL_DNS_CONFIG_TBODY_ID = 'dns-view-internal-dns-config-tbody';

    DnsView.CLEAR_CACHE_BUTTON_ID = 'dns-view-clear-cache';
    DnsView.CAPACITY_SPAN_ID = 'dns-view-cache-capacity';

    DnsView.ACTIVE_SPAN_ID = 'dns-view-cache-active';
    DnsView.EXPIRED_SPAN_ID = 'dns-view-cache-expired';
    DnsView.NETWORK_SPAN_ID = 'dns-view-network-changes';
    DnsView.CACHE_TBODY_ID = 'dns-view-cache-tbody';

    cr.addSingletonGetter(DnsView);

    DnsView.prototype = {
        // Inherit the superclass's methods.
        __proto__: superClass.prototype,

        onLoadLogFinish: function(data) {
            return this.onHostResolverInfoChanged(data.hostResolverInfo);
        },

        onHostResolverInfoChanged: function(hostResolverInfo) {
            // Clear the existing values.
            $(DnsView.CAPACITY_SPAN_ID).innerHTML = '';
            $(DnsView.CACHE_TBODY_ID).innerHTML = '';
            $(DnsView.ACTIVE_SPAN_ID).innerHTML = '0';
            $(DnsView.EXPIRED_SPAN_ID).innerHTML = '0';
            $(DnsView.NETWORK_SPAN_ID).innerHTML = '0';

            // Update fields containing async DNS configuration information.
            displayAsyncDnsConfig_(hostResolverInfo);

            // No info.
            if (!hostResolverInfo || !hostResolverInfo.cache)
                return false;

            // Fill in the basic cache information.
            var hostResolverCache = hostResolverInfo.cache;
            $(DnsView.CAPACITY_SPAN_ID).innerText = hostResolverCache.capacity;
            $(DnsView.NETWORK_SPAN_ID).innerText =
                valueOrDefault(hostResolverCache.network_changes, '');

            var expiredEntries = 0;
            // Date the cache was logged.  This will be either now, when actively
            // logging data, or the date the log dump was created.
            var logDate;
            if (MainView.isViewingLoadedLog()) {
                logDate = new Date(ClientInfo.numericDate);
            } else {
                logDate = new Date();
            }

            // Fill in the cache contents table.
            for (var i = 0; i < hostResolverCache.entries.length; ++i) {
                var e = hostResolverCache.entries[i];
                var tr = addNode($(DnsView.CACHE_TBODY_ID), 'tr');
                var expired = false;

                var hostnameCell = addNode(tr, 'td');
                addTextNode(hostnameCell, e.hostname);

                var familyCell = addNode(tr, 'td');
                addTextNode(familyCell, addressFamilyToString(e.address_family));

                var addressesCell = addNode(tr, 'td');

                if (e.error != undefined) {
                    var errorText = e.error + ' (' + netErrorToString(e.error) + ')';
                    var errorNode = addTextNode(addressesCell, 'error: ' + errorText);
                    addressesCell.classList.add('warning-text');
                } else {
                    addListToNode_(addNode(addressesCell, 'div'), e.addresses);
                }

                var ttlCell = addNode(tr, 'td');
                addTextNode(ttlCell, valueOrDefault(e.ttl, ''));

                var expiresDate = timeutil.convertTimeTicksToDate(e.expiration);
                var expiresCell = addNode(tr, 'td');
                timeutil.addNodeWithDate(expiresCell, expiresDate);
                if (logDate > timeutil.convertTimeTicksToDate(e.expiration)) {
                    expired = true;
                    var expiredSpan = addNode(expiresCell, 'span');
                    expiredSpan.classList.add('warning-text');
                    addTextNode(expiredSpan, ' [Expired]');
                }

                // HostCache keeps track of how many network changes have happened since
                // it was created, and entries store what that number was at the time
                // they were created. If more network changes have happened since an
                // entry was created, the entry is expired.
                var networkChangesCell = addNode(tr, 'td');
                addTextNode(networkChangesCell, valueOrDefault(e.network_changes, ''));
                if (e.network_changes < hostResolverCache.network_changes) {
                    expired = true;
                    var expiredSpan = addNode(networkChangesCell, 'span');
                    expiredSpan.classList.add('warning-text');
                    addTextNode(expiredSpan, ' [Expired]');
                }

                if (expired) {
                    expiredEntries++;
                }
            }

            $(DnsView.ACTIVE_SPAN_ID).innerText =
                hostResolverCache.entries.length - expiredEntries;
            $(DnsView.EXPIRED_SPAN_ID).innerText = expiredEntries;
            return true;
        },
    };

    /**
     * Displays information corresponding to the current async DNS configuration.
     * @param {Object} hostResolverInfo The host resolver information.
     */
    function displayAsyncDnsConfig_(hostResolverInfo) {
        // Clear the table.
        $(DnsView.INTERNAL_DNS_CONFIG_TBODY_ID).innerHTML = '';

        // Figure out if the internal DNS resolver is disabled or has no valid
        // configuration information, and update display accordingly.
        var enabled = hostResolverInfo && hostResolverInfo.dns_config !== undefined;
        var noConfig =
            enabled && hostResolverInfo.dns_config.nameservers === undefined;
        $(DnsView.INTERNAL_DNS_ENABLED_SPAN_ID).innerText = enabled;
        setNodeDisplay($(DnsView.INTERNAL_DNS_INVALID_CONFIG_SPAN_ID), noConfig);

        // If the internal DNS resolver is disabled or has no valid configuration,
        // we're done.
        if (!enabled || noConfig)
            return;

        var dnsConfig = hostResolverInfo.dns_config;

        // Display nameservers first.
        var nameserverRow = addNode($(DnsView.INTERNAL_DNS_CONFIG_TBODY_ID), 'tr');
        addNodeWithText(nameserverRow, 'th', 'nameservers');
        addListToNode_(addNode(nameserverRow, 'td'), dnsConfig.nameservers);

        // Add everything else in |dnsConfig| to the table.
        for (var key in dnsConfig) {
            if (key == 'nameservers')
                continue;
            var tr = addNode($(DnsView.INTERNAL_DNS_CONFIG_TBODY_ID), 'tr');
            addNodeWithText(tr, 'th', key);
            var td = addNode(tr, 'td');

            // For lists, display each list entry on a separate line.
            if (typeof dnsConfig[key] == 'object' &&
                dnsConfig[key].constructor == Array) {
                addListToNode_(td, dnsConfig[key]);
                continue;
            }

            addTextNode(td, dnsConfig[key]);
        }
    }

    /**
     * Takes a last of strings and adds them all to a DOM node, displaying them
     * on separate lines.
     * @param {DomNode} node The parent node.
     * @param {Array<string>} list List of strings to add to the node.
     */
    function addListToNode_(node, list) {
        for (var i = 0; i < list.length; ++i)
            addNodeWithText(node, 'div', list[i]);
    }

    // TODO(mgersh): The |ttl| and |network_changes| properties were introduced in
    // M59 and may not exist when loading older logs. This can be removed in M62.
    function valueOrDefault(value, defaultValue) {
        if (value != undefined)
            return value;
        return defaultValue;
    }

    return DnsView;
})();

// // Copyright (c) 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var SourceFilterParser = (function() {
    'use strict';

    /**
     * Parses |filterText|, extracting a sort method, a list of filters, and a
     * copy of |filterText| with all sort parameters removed.
     */
    function SourceFilterParser(filterText) {
        // Final output will be stored here.
        this.filter = null;
        this.sort = {};
        this.filterTextWithoutSort = '';
        var filterList = parseFilter_(filterText);

        // Text filters are stored here as strings and then added as a function at
        // the end, for performance reasons.
        var textFilters = [];

        // Filter functions are first created individually, and then merged.
        var filterFunctions = [];

        for (var i = 0; i < filterList.length; ++i) {
            var filterElement = filterList[i].parsed;
            var negated = filterList[i].negated;

            var sort = parseSortDirective_(filterElement, negated);
            if (sort) {
                this.sort = sort;
                continue;
            }

            this.filterTextWithoutSort += filterList[i].original;

            var filter = parseRestrictDirective_(filterElement, negated);
            if (!filter)
                filter = parseStringDirective_(filterElement, negated);
            if (filter) {
                if (negated) {
                    filter = (function(func, sourceEntry) {
                        return !func(sourceEntry);
                    }).bind(null, filter);
                }
                filterFunctions.push(filter);
                continue;
            }
            textFilters.push({text: filterElement, negated: negated});
        }

        // Create a single filter for all text filters, so they can share a
        // TabePrinter.
        filterFunctions.push(textFilter_.bind(null, textFilters));

        // Create function to go through all the filters.
        this.filter = function(sourceEntry) {
            for (var i = 0; i < filterFunctions.length; ++i) {
                if (!filterFunctions[i](sourceEntry))
                    return false;
            }
            return true;
        };
    }

    /**
     * Parses a single "sort:" directive, and returns a dictionary containing
     * the sort function and direction.  Returns null on failure, including
     * the case when no such sort function exists.
     */
    function parseSortDirective_(filterElement, backwards) {
        var match = /^sort:(.*)$/.exec(filterElement);
        if (!match)
            return null;
        return {method: match[1], backwards: backwards};
    }

    /**
     * Tries to parses |filterElement| as a single "is:" directive, and returns a
     * new filter function.  Returns null on failure.
     */
    function parseRestrictDirective_(filterElement) {
        var match = /^is:(.*)$/.exec(filterElement);
        if (!match)
            return null;
        if (match[1] == 'active') {
            return function(sourceEntry) {
                return !sourceEntry.isInactive();
            };
        }
        if (match[1] == 'error') {
            return function(sourceEntry) {
                return sourceEntry.isError();
            };
        }
        return null;
    }

    /**
     * Tries to parse |filterElement| as a single filter of a type that takes
     * arbitrary strings as input, and returns a new filter function on success.
     * Returns null on failure.
     */
    function parseStringDirective_(filterElement) {
        var match = RegExp('^([^:]*):(.*)$').exec(filterElement);
        if (!match)
            return null;

        // Split parameters around commas and remove empty elements.
        var parameters = match[2].split(',');
        parameters = parameters.filter(function(string) {
            return string.length > 0;
        });

        if (match[1] == 'type') {
            return function(sourceEntry) {
                var i;
                var sourceType = sourceEntry.getSourceTypeString().toLowerCase();
                for (i = 0; i < parameters.length; ++i) {
                    if (sourceType.search(parameters[i]) != -1)
                        return true;
                }
                return false;
            };
        }

        if (match[1] == 'id') {
            return function(sourceEntry) {
                return parameters.indexOf(sourceEntry.getSourceId() + '') != -1;
            };
        }

        return null;
    }

    /**
     * Takes in the text of a filter and returns a list of
     * {parsed, original, negated} values that correspond to substrings of the
     * filter before and after filtering, and whether or not it started with a
     * '-'.  Extra whitespace other than a single character after each element is
     * ignored.  Parsed strings are all lowercase.
     */
    function parseFilter_(filterText) {
        // Assemble a list of quoted and unquoted strings in the filter.
        var filterList = [];
        var position = 0;
        while (position < filterText.length) {
            var inQuote = false;
            var filterElement = '';
            var negated = false;
            var startPosition = position;
            while (position < filterText.length) {
                var nextCharacter = filterText[position];
                ++position;
                if (nextCharacter == '\\' && position < filterText.length) {
                    // If there's a backslash, skip the backslash and add the next
                    // character to the element.
                    filterElement += filterText[position];
                    ++position;
                    continue;
                } else if (nextCharacter == '"') {
                    // If there's an unescaped quote character, toggle |inQuote| without
                    // modifying the element.
                    inQuote = !inQuote;
                } else if (!inQuote && /\s/.test(nextCharacter)) {
                    // If not in a quote and have a whitespace character, that's the
                    // end of the element.
                    break;
                } else if (nextCharacter == '-' && startPosition == position - 1) {
                    // If this is the first character, and it's a '-', this entry is
                    // negated.
                    negated = true;
                } else {
                    // Otherwise, add the next character to the element.
                    filterElement += nextCharacter;
                }
            }

            if (filterElement.length > 0) {
                var filter = {
                    parsed: filterElement.toLowerCase(),
                    original: filterText.substring(startPosition, position),
                    negated: negated,
                };
                filterList.push(filter);
            }
        }
        return filterList;
    }

    /**
     * Takes in a list of text filters and a SourceEntry.  Each filter has
     * "text" and "negated" fields.  Returns true if the SourceEntry matches all
     * filters in the (possibly empty) list.
     */
    function textFilter_(textFilters, sourceEntry) {
        var tablePrinter = null;
        for (var i = 0; i < textFilters.length; ++i) {
            var text = textFilters[i].text;
            var negated = textFilters[i].negated;
            var match = false;
            // The description is often not contained in one of the log entries.
            // The source type almost never is, so check for them directly.
            var description = sourceEntry.getDescription().toLowerCase();
            var type = sourceEntry.getSourceTypeString().toLowerCase();
            if (description.indexOf(text) != -1 || type.indexOf(text) != -1) {
                match = true;
            } else {
                if (!tablePrinter)
                    tablePrinter = sourceEntry.createTablePrinter();
                match = tablePrinter.search(text);
            }
            if (negated)
                match = !match;
            if (!match)
                return false;
        }
        return true;
    }

    return SourceFilterParser;
})();

// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var SourceRow = (function() {
    'use strict';

    /**
     * A SourceRow represents the row corresponding to a single SourceEntry
     * displayed by the EventsView.
     *
     * @constructor
     */
    function SourceRow(parentView, sourceEntry) {
        this.parentView_ = parentView;

        this.sourceEntry_ = sourceEntry;
        this.isSelected_ = false;
        this.isMatchedByFilter_ = false;

        // Used to set CSS class for display.  Must only be modified by calling
        // corresponding set functions.
        this.isSelected_ = false;
        this.isMouseOver_ = false;

        // Mirror sourceEntry's values, so we only update the DOM when necessary.
        this.isError_ = sourceEntry.isError();
        this.isInactive_ = sourceEntry.isInactive();
        this.description_ = sourceEntry.getDescription();

        this.createRow_();
        this.onSourceUpdated();
    }

    SourceRow.prototype = {
        createRow_: function() {
            // Create a row.
            var tr = addNode(this.parentView_.tableBody_, 'tr');
            tr._id = this.getSourceId();
            tr.style.display = 'none';
            this.row_ = tr;

            var selectionCol = addNode(tr, 'td');
            var checkbox = addNode(selectionCol, 'input');
            checkbox.title = this.getSourceId();
            selectionCol.style.borderLeft = '0';
            checkbox.type = 'checkbox';

            var idCell = addNode(tr, 'td');
            idCell.style.textAlign = 'right';

            var typeCell = addNode(tr, 'td');
            var descriptionCell = addNode(tr, 'td');
            this.descriptionCell_ = descriptionCell;

            // Connect listeners.
            checkbox.onchange = this.onCheckboxToggled_.bind(this);

            var onclick = this.onClicked_.bind(this);
            idCell.onclick = onclick;
            typeCell.onclick = onclick;
            descriptionCell.onclick = onclick;

            tr.onmouseover = this.onMouseover_.bind(this);
            tr.onmouseout = this.onMouseout_.bind(this);

            // Set the cell values to match this source's data.
            if (this.getSourceId() >= 0) {
                addTextNode(idCell, this.getSourceId());
            } else {
                addTextNode(idCell, '-');
            }
            var sourceTypeString = this.sourceEntry_.getSourceTypeString();
            addTextNode(typeCell, sourceTypeString);
            this.updateDescription_();

            // Add a CSS classname specific to this source type (so CSS can specify
            // different stylings for different types).
            var sourceTypeClass = sourceTypeString.toLowerCase().replace(/_/g, '-');
            this.row_.classList.add('source-' + sourceTypeClass);

            this.updateClass_();
        },

        onSourceUpdated: function() {
            if (this.sourceEntry_.isInactive() != this.isInactive_ ||
                this.sourceEntry_.isError() != this.isError_) {
                this.updateClass_();
            }

            if (this.description_ != this.sourceEntry_.getDescription())
                this.updateDescription_();

            // Update filters.
            var matchesFilter = this.parentView_.currentFilter_(this.sourceEntry_);
            this.setIsMatchedByFilter(matchesFilter);
        },

        /**
         * Changes |row_|'s class based on currently set flags.  Clears any previous
         * class set by this method.  This method is needed so that some styles
         * override others.
         */
        updateClass_: function() {
            this.isInactive_ = this.sourceEntry_.isInactive();
            this.isError_ = this.sourceEntry_.isError();

            // Each element of this list contains a property of |this| and the
            // corresponding class name to set if that property is true.  Entries
            // earlier in the list take precedence.
            var propertyNames = [
                ['isSelected_', 'selected'],
                ['isMouseOver_', 'mouseover'],
                ['isError_', 'error'],
                ['isInactive_', 'inactive'],
            ];

            // Loop through |propertyNames| in order, checking if each property
            // is true.  For the first such property found, if any, add the
            // corresponding class to the SourceEntry's row.  Remove classes
            // that correspond to any other property.
            var noStyleSet = true;
            for (var i = 0; i < propertyNames.length; ++i) {
                var setStyle = noStyleSet && this[propertyNames[i][0]];
                if (setStyle) {
                    this.row_.classList.add(propertyNames[i][1]);
                    noStyleSet = false;
                } else {
                    this.row_.classList.remove(propertyNames[i][1]);
                }
            }
        },

        getSourceEntry: function() {
            return this.sourceEntry_;
        },

        setIsMatchedByFilter: function(isMatchedByFilter) {
            if (this.isMatchedByFilter() == isMatchedByFilter)
                return;  // No change.

            this.isMatchedByFilter_ = isMatchedByFilter;

            this.setFilterStyles(isMatchedByFilter);

            if (isMatchedByFilter) {
                this.parentView_.incrementPostfilterCount(1);
            } else {
                this.parentView_.incrementPostfilterCount(-1);
                // If we are filtering an entry away, make sure it is no longer
                // part of the selection.
                this.setSelected(false);
            }
        },

        isMatchedByFilter: function() {
            return this.isMatchedByFilter_;
        },

        setFilterStyles: function(isMatchedByFilter) {
            // Hide rows which have been filtered away.
            if (isMatchedByFilter) {
                this.row_.style.display = '';
            } else {
                this.row_.style.display = 'none';
            }
        },

        isSelected: function() {
            return this.isSelected_;
        },

        setSelected: function(isSelected) {
            if (isSelected == this.isSelected())
                return;

            this.isSelected_ = isSelected;

            this.setSelectedStyles(isSelected);
            this.parentView_.modifySelectionArray(this.getSourceId(), isSelected);
            this.parentView_.onSelectionChanged();
        },

        setSelectedStyles: function(isSelected) {
            this.isSelected_ = isSelected;
            this.getSelectionCheckbox().checked = isSelected;
            this.updateClass_();
        },

        setMouseoverStyle: function(isMouseOver) {
            this.isMouseOver_ = isMouseOver;
            this.updateClass_();
        },

        onClicked_: function() {
            this.parentView_.clearSelection();
            this.setSelected(true);
            if (this.isSelected())
                this.parentView_.scrollToSourceId(this.getSourceId());
        },

        onMouseover_: function() {
            this.setMouseoverStyle(true);
        },

        onMouseout_: function() {
            this.setMouseoverStyle(false);
        },

        updateDescription_: function() {
            this.description_ = this.sourceEntry_.getDescription();
            this.descriptionCell_.innerHTML = '';
            addTextNode(this.descriptionCell_, this.description_);
        },

        onCheckboxToggled_: function() {
            this.setSelected(this.getSelectionCheckbox().checked);
            if (this.isSelected())
                this.parentView_.scrollToSourceId(this.getSourceId());
        },

        getSelectionCheckbox: function() {
            return this.row_.childNodes[0].firstChild;
        },

        getSourceId: function() {
            return this.sourceEntry_.getSourceId();
        },

        /**
         * Returns source ID of the entry whose row is currently above this one's.
         * Returns null if no such node exists.
         */
        getPreviousNodeSourceId: function() {
            var prevNode = this.row_.previousSibling;
            if (prevNode == null)
                return null;
            return prevNode._id;
        },

        /**
         * Returns source ID of the entry whose row is currently below this one's.
         * Returns null if no such node exists.
         */
        getNextNodeSourceId: function() {
            var nextNode = this.row_.nextSibling;
            if (nextNode == null)
                return null;
            return nextNode._id;
        },

        /**
         * Moves current object's row before |entry|'s row.
         */
        moveBefore: function(entry) {
            this.row_.parentNode.insertBefore(this.row_, entry.row_);
        },

        /**
         * Moves current object's row after |entry|'s row.
         */
        moveAfter: function(entry) {
            this.row_.parentNode.insertBefore(this.row_, entry.row_.nextSibling);
        }
    };

    return SourceRow;
})();

// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * EventsView displays a filtered list of all events sharing a source, and
 * a details pane for the selected sources.
 *
 *  +----------------------++----------------+
 *  |      filter box      ||                |
 *  +----------------------+|                |
 *  |                      ||                |
 *  |                      ||                |
 *  |                      ||                |
 *  |                      ||                |
 *  |     source list      ||    details     |
 *  |                      ||    view        |
 *  |                      ||                |
 *  |                      ||                |
 *  |                      ||                |
 *  |                      ||                |
 *  |                      ||                |
 *  |                      ||                |
 *  +----------------------++----------------+
 */
var EventsView = (function() {
    'use strict';

    // How soon after updating the filter list the counter should be updated.
    var REPAINT_FILTER_COUNTER_TIMEOUT_MS = 0;

    // We inherit from View.
    var superClass = View;

    /*
   * @constructor
   */
    function EventsView() {
        assertFirstConstructorCall(EventsView);

        // Call superclass's constructor.
        superClass.call(this);

        // Initialize the sub-views.
        var leftPane = new VerticalSplitView(
            new DivView(EventsView.TOPBAR_ID), new DivView(EventsView.LIST_BOX_ID));

        this.detailsView_ = new DetailsView(EventsView.DETAILS_LOG_BOX_ID);

        this.splitterView_ = new ResizableVerticalSplitView(
            leftPane, this.detailsView_, new DivView(EventsView.SIZER_ID));

        SourceTracker.getInstance().addSourceEntryObserver(this);

        this.tableBody_ = $(EventsView.TBODY_ID);

        this.filterInput_ = $(EventsView.FILTER_INPUT_ID);
        this.filterCount_ = $(EventsView.FILTER_COUNT_ID);

        this.filterInput_.addEventListener(
            'search', this.onFilterTextChanged_.bind(this), true);

        $(EventsView.SELECT_ALL_ID)
            .addEventListener('click', this.selectAll_.bind(this), true);

        $(EventsView.SORT_BY_ID_ID)
            .addEventListener('click', this.sortById_.bind(this), true);

        $(EventsView.SORT_BY_SOURCE_TYPE_ID)
            .addEventListener('click', this.sortBySourceType_.bind(this), true);

        $(EventsView.SORT_BY_DESCRIPTION_ID)
            .addEventListener('click', this.sortByDescription_.bind(this), true);

        new MouseOverHelp(
            EventsView.FILTER_HELP_ID, EventsView.FILTER_HELP_HOVER_ID);

        // Sets sort order and filter.
        this.setFilter_('');

        this.initializeSourceList_();
    }

    EventsView.TAB_ID = 'tab-handle-events';
    EventsView.TAB_NAME = 'Events';
    EventsView.TAB_HASH = '#events';

    // IDs for special HTML elements in events_view.html
    EventsView.TBODY_ID = 'events-view-source-list-tbody';
    EventsView.FILTER_INPUT_ID = 'events-view-filter-input';
    EventsView.FILTER_COUNT_ID = 'events-view-filter-count';
    EventsView.FILTER_HELP_ID = 'events-view-filter-help';
    EventsView.FILTER_HELP_HOVER_ID = 'events-view-filter-help-hover';
    EventsView.SELECT_ALL_ID = 'events-view-select-all';
    EventsView.SORT_BY_ID_ID = 'events-view-sort-by-id';
    EventsView.SORT_BY_SOURCE_TYPE_ID = 'events-view-sort-by-source';
    EventsView.SORT_BY_DESCRIPTION_ID = 'events-view-sort-by-description';
    EventsView.DETAILS_LOG_BOX_ID = 'events-view-details-log-box';
    EventsView.TOPBAR_ID = 'events-view-filter-box';
    EventsView.LIST_BOX_ID = 'events-view-source-list';
    EventsView.SIZER_ID = 'events-view-splitter-box';

    cr.addSingletonGetter(EventsView);

    EventsView.prototype = {
        // Inherit the superclass's methods.
        __proto__: superClass.prototype,

        /**
         * Initializes the list of source entries.  If source entries are already,
         * being displayed, removes them all in the process.
         */
        initializeSourceList_: function() {
            this.currentSelectedRows_ = [];
            this.sourceIdToRowMap_ = {};
            this.tableBody_.innerHTML = '';
            this.numPrefilter_ = 0;
            this.numPostfilter_ = 0;
            this.invalidateFilterCounter_();
            this.invalidateDetailsView_();
        },

        setGeometry: function(left, top, width, height) {
            superClass.prototype.setGeometry.call(this, left, top, width, height);
            this.splitterView_.setGeometry(left, top, width, height);
        },

        show: function(isVisible) {
            superClass.prototype.show.call(this, isVisible);
            this.splitterView_.show(isVisible);
        },

        getFilterText_: function() {
            return this.filterInput_.value;
        },

        setFilterText_: function(filterText) {
            this.filterInput_.value = filterText;
            this.onFilterTextChanged_();
        },

        onFilterTextChanged_: function() {
            this.setFilter_(this.getFilterText_());
        },

        /**
         * Updates text in the details view when time display mode is toggled.
         */
        onUseRelativeTimesChanged: function() {
            this.invalidateDetailsView_();
        },

        comparisonFuncWithReversing_: function(a, b) {
            var result = this.comparisonFunction_(a, b);
            if (this.doSortBackwards_)
                result *= -1;
            return result;
        },

        sort_: function() {
            var sourceEntries = [];
            for (var id in this.sourceIdToRowMap_) {
                sourceEntries.push(this.sourceIdToRowMap_[id].getSourceEntry());
            }
            sourceEntries.sort(this.comparisonFuncWithReversing_.bind(this));

            // Reposition source rows from back to front.
            for (var i = sourceEntries.length - 2; i >= 0; --i) {
                var sourceRow = this.sourceIdToRowMap_[sourceEntries[i].getSourceId()];
                var nextSourceId = sourceEntries[i + 1].getSourceId();
                if (sourceRow.getNextNodeSourceId() != nextSourceId) {
                    var nextSourceRow = this.sourceIdToRowMap_[nextSourceId];
                    sourceRow.moveBefore(nextSourceRow);
                }
            }
        },

        setFilter_: function(filterText) {
            var lastComparisonFunction = this.comparisonFunction_;
            var lastDoSortBackwards = this.doSortBackwards_;

            var filterParser = new SourceFilterParser(filterText);
            this.currentFilter_ = filterParser.filter;

            this.pickSortFunction_(filterParser.sort);

            if (lastComparisonFunction != this.comparisonFunction_ ||
                lastDoSortBackwards != this.doSortBackwards_) {
                this.sort_();
            }

            // Iterate through all of the rows and see if they match the filter.
            for (var id in this.sourceIdToRowMap_) {
                var entry = this.sourceIdToRowMap_[id];
                entry.setIsMatchedByFilter(this.currentFilter_(entry.getSourceEntry()));
            }
        },

        /**
         * Given a "sort" object with "method" and "backwards" keys, looks up and
         * sets |comparisonFunction_| and |doSortBackwards_|.  If the ID does not
         * correspond to a sort function, defaults to sorting by ID.
         */
        pickSortFunction_: function(sort) {
            this.doSortBackwards_ = sort.backwards;
            this.comparisonFunction_ = COMPARISON_FUNCTION_TABLE[sort.method];
            if (!this.comparisonFunction_) {
                this.doSortBackwards_ = false;
                this.comparisonFunction_ = compareSourceId_;
            }
        },

        /**
         * Repositions |sourceRow|'s in the table using an insertion sort.
         * Significantly faster than sorting the entire table again, when only
         * one entry has changed.
         */
        insertionSort_: function(sourceRow) {
            // SourceRow that should be after |sourceRow|, if it needs
            // to be moved earlier in the list.
            var sourceRowAfter = sourceRow;
            while (true) {
                var prevSourceId = sourceRowAfter.getPreviousNodeSourceId();
                if (prevSourceId == null)
                    break;
                var prevSourceRow = this.sourceIdToRowMap_[prevSourceId];
                if (this.comparisonFuncWithReversing_(
                    sourceRow.getSourceEntry(), prevSourceRow.getSourceEntry()) >=
                    0) {
                    break;
                }
                sourceRowAfter = prevSourceRow;
            }
            if (sourceRowAfter != sourceRow) {
                sourceRow.moveBefore(sourceRowAfter);
                return;
            }

            var sourceRowBefore = sourceRow;
            while (true) {
                var nextSourceId = sourceRowBefore.getNextNodeSourceId();
                if (nextSourceId == null)
                    break;
                var nextSourceRow = this.sourceIdToRowMap_[nextSourceId];
                if (this.comparisonFuncWithReversing_(
                    sourceRow.getSourceEntry(), nextSourceRow.getSourceEntry()) <=
                    0) {
                    break;
                }
                sourceRowBefore = nextSourceRow;
            }
            if (sourceRowBefore != sourceRow)
                sourceRow.moveAfter(sourceRowBefore);
        },

        /**
         * Called whenever SourceEntries are updated with new log entries.  Updates
         * the corresponding table rows, sort order, and the details view as needed.
         */
        onSourceEntriesUpdated: function(sourceEntries) {
            var isUpdatedSourceSelected = false;
            var numNewSourceEntries = 0;

            for (var i = 0; i < sourceEntries.length; ++i) {
                var sourceEntry = sourceEntries[i];

                // Lookup the row.
                var sourceRow = this.sourceIdToRowMap_[sourceEntry.getSourceId()];

                if (!sourceRow) {
                    sourceRow = new SourceRow(this, sourceEntry);
                    this.sourceIdToRowMap_[sourceEntry.getSourceId()] = sourceRow;
                    ++numNewSourceEntries;
                } else {
                    sourceRow.onSourceUpdated();
                }

                if (sourceRow.isSelected())
                    isUpdatedSourceSelected = true;

                // TODO(mmenke): Fix sorting when sorting by duration.
                //               Duration continuously increases for all entries that
                //               are still active.  This can result in incorrect
                //               sorting, until sort_ is called.
                this.insertionSort_(sourceRow);
            }

            if (isUpdatedSourceSelected)
                this.invalidateDetailsView_();
            if (numNewSourceEntries)
                this.incrementPrefilterCount(numNewSourceEntries);
        },

        /**
         * Returns the SourceRow with the specified ID, if there is one.
         * Otherwise, returns undefined.
         */
        getSourceRow: function(id) {
            return this.sourceIdToRowMap_[id];
        },

        /**
         * Called whenever all log events are deleted.
         */
        onAllSourceEntriesDeleted: function() {
            this.initializeSourceList_();
        },

        /**
         * Called when either a log file is loaded, after clearing the old entries,
         * but before getting any new ones.
         */
        onLoadLogStart: function() {
            // Needed to sort new sourceless entries correctly.
            this.maxReceivedSourceId_ = 0;
        },

        onLoadLogFinish: function(data) {
            return true;
        },

        incrementPrefilterCount: function(offset) {
            this.numPrefilter_ += offset;
            this.invalidateFilterCounter_();
        },

        incrementPostfilterCount: function(offset) {
            this.numPostfilter_ += offset;
            this.invalidateFilterCounter_();
        },

        onSelectionChanged: function() {
            this.invalidateDetailsView_();
        },

        clearSelection: function() {
            var prevSelection = this.currentSelectedRows_;
            this.currentSelectedRows_ = [];

            // Unselect everything that is currently selected.
            for (var i = 0; i < prevSelection.length; ++i) {
                prevSelection[i].setSelected(false);
            }

            this.onSelectionChanged();
        },

        selectAll_: function(event) {
            for (var id in this.sourceIdToRowMap_) {
                var sourceRow = this.sourceIdToRowMap_[id];
                if (sourceRow.isMatchedByFilter()) {
                    sourceRow.setSelected(true);
                }
            }
            event.preventDefault();
        },

        unselectAll_: function() {
            var entries = this.currentSelectedRows_.slice(0);
            for (var i = 0; i < entries.length; ++i) {
                entries[i].setSelected(false);
            }
        },

        /**
         * If |params| includes a query, replaces the current filter and unselects.
         * all items.  If it includes a selection, tries to select the relevant
         * item.
         */
        setParameters: function(params) {
            if (params.q) {
                this.unselectAll_();
                this.setFilterText_(params.q);
            }

            if (params.s) {
                var sourceRow = this.sourceIdToRowMap_[params.s];
                if (sourceRow) {
                    sourceRow.setSelected(true);
                    this.scrollToSourceId(params.s);
                }
            }
        },

        /**
         * Scrolls to the source indicated by |sourceId|, if displayed.
         */
        scrollToSourceId: function(sourceId) {
            this.detailsView_.scrollToSourceId(sourceId);
        },

        /**
         * If already using the specified sort method, flips direction.  Otherwise,
         * removes pre-existing sort parameter before adding the new one.
         */
        toggleSortMethod_: function(sortMethod) {
            // Get old filter text and remove old sort directives, if any.
            var filterParser = new SourceFilterParser(this.getFilterText_());
            var filterText = filterParser.filterTextWithoutSort;

            filterText = 'sort:' + sortMethod + ' ' + filterText;

            // If already using specified sortMethod, sort backwards.
            if (!this.doSortBackwards_ &&
                COMPARISON_FUNCTION_TABLE[sortMethod] == this.comparisonFunction_) {
                filterText = '-' + filterText;
            }

            this.setFilterText_(filterText.trim());
        },

        sortById_: function(event) {
            this.toggleSortMethod_('id');
        },

        sortBySourceType_: function(event) {
            this.toggleSortMethod_('source');
        },

        sortByDescription_: function(event) {
            this.toggleSortMethod_('desc');
        },

        /**
         * Modifies the map of selected rows to include/exclude the one with
         * |sourceId|, if present.  Does not modify checkboxes or the LogView.
         * Should only be called by a SourceRow in response to its selection
         * state changing.
         */
        modifySelectionArray: function(sourceId, addToSelection) {
            var sourceRow = this.sourceIdToRowMap_[sourceId];
            if (!sourceRow)
                return;
            // Find the index for |sourceEntry| in the current selection list.
            var index = -1;
            for (var i = 0; i < this.currentSelectedRows_.length; ++i) {
                if (this.currentSelectedRows_[i] == sourceRow) {
                    index = i;
                    break;
                }
            }

            if (index != -1 && !addToSelection) {
                // Remove from the selection.
                this.currentSelectedRows_.splice(index, 1);
            }

            if (index == -1 && addToSelection) {
                this.currentSelectedRows_.push(sourceRow);
            }
        },

        getSelectedSourceEntries_: function() {
            var sourceEntries = [];
            for (var i = 0; i < this.currentSelectedRows_.length; ++i) {
                sourceEntries.push(this.currentSelectedRows_[i].getSourceEntry());
            }
            return sourceEntries;
        },

        invalidateDetailsView_: function() {
            this.detailsView_.setData(this.getSelectedSourceEntries_());
        },

        invalidateFilterCounter_: function() {
            if (!this.outstandingRepaintFilterCounter_) {
                this.outstandingRepaintFilterCounter_ = true;
                window.setTimeout(
                    this.repaintFilterCounter_.bind(this),
                    REPAINT_FILTER_COUNTER_TIMEOUT_MS);
            }
        },

        repaintFilterCounter_: function() {
            this.outstandingRepaintFilterCounter_ = false;
            this.filterCount_.innerHTML = '';
            addTextNode(
                this.filterCount_, this.numPostfilter_ + ' of ' + this.numPrefilter_);
        }
    };  // end of prototype.

    // ------------------------------------------------------------------------
    // Helper code for comparisons
    // ------------------------------------------------------------------------

    var COMPARISON_FUNCTION_TABLE = {
        // sort: and sort:- are allowed
        '': compareSourceId_,
        'active': compareActive_,
        'desc': compareDescription_,
        'description': compareDescription_,
        'duration': compareDuration_,
        'id': compareSourceId_,
        'source': compareSourceType_,
        'type': compareSourceType_
    };

    /**
     * Sorts active entries first.  If both entries are inactive, puts the one
     * that was active most recently first.  If both are active, uses source ID,
     * which puts longer lived events at the top, and behaves better than using
     * duration or time of first event.
     */
    function compareActive_(source1, source2) {
        if (!source1.isInactive() && source2.isInactive())
            return -1;
        if (source1.isInactive() && !source2.isInactive())
            return 1;
        if (source1.isInactive()) {
            var deltaEndTime = source1.getEndTicks() - source2.getEndTicks();
            if (deltaEndTime != 0) {
                // The one that ended most recently (Highest end time) should be sorted
                // first.
                return -deltaEndTime;
            }
            // If both ended at the same time, then odds are they were related events,
            // started one after another, so sort in the opposite order of their
            // source IDs to get a more intuitive ordering.
            return -compareSourceId_(source1, source2);
        }
        return compareSourceId_(source1, source2);
    }

    function compareDescription_(source1, source2) {
        var source1Text = source1.getDescription().toLowerCase();
        var source2Text = source2.getDescription().toLowerCase();
        var compareResult = source1Text.localeCompare(source2Text);
        if (compareResult != 0)
            return compareResult;
        return compareSourceId_(source1, source2);
    }

    function compareDuration_(source1, source2) {
        var durationDifference = source2.getDuration() - source1.getDuration();
        if (durationDifference)
            return durationDifference;
        return compareSourceId_(source1, source2);
    }

    /**
     * For the purposes of sorting by source IDs, entries without a source
     * appear right after the SourceEntry with the highest source ID received
     * before the sourceless entry. Any ambiguities are resolved by ordering
     * the entries without a source by the order in which they were received.
     */
    function compareSourceId_(source1, source2) {
        var sourceId1 = source1.getSourceId();
        if (sourceId1 < 0)
            sourceId1 = source1.getMaxPreviousEntrySourceId();
        var sourceId2 = source2.getSourceId();
        if (sourceId2 < 0)
            sourceId2 = source2.getMaxPreviousEntrySourceId();

        if (sourceId1 != sourceId2)
            return sourceId1 - sourceId2;

        // One or both have a negative ID. In either case, the source with the
        // highest ID should be sorted first.
        return source2.getSourceId() - source1.getSourceId();
    }

    function compareSourceType_(source1, source2) {
        var source1Text = source1.getSourceTypeString();
        var source2Text = source2.getSourceTypeString();
        var compareResult = source1Text.localeCompare(source2Text);
        if (compareResult != 0)
            return compareResult;
        return compareSourceId_(source1, source2);
    }

    return EventsView;
})();

// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var DetailsView = (function() {
    'use strict';

    // We inherit from DivView.
    var superClass = DivView;

    /**
     * The DetailsView displays the "log" view. This class keeps track of the
     * selected SourceEntries, and repaints when they change.
     *
     * @constructor
     */
    function DetailsView(boxId) {
        superClass.call(this, boxId);
        this.sourceEntries_ = [];
        // Map of source IDs to their corresponding DIVs.
        this.sourceIdToDivMap_ = {};
        // True when there's an asychronous repaint outstanding.
        this.outstandingRepaint_ = false;
        // ID of source entry we should jump to after the oustanding repaint.
        // 0 if none, or there's no such repaint.
        this.outstandingScrollToId_ = 0;
    }

    // The delay between updates to repaint.
    var REPAINT_TIMEOUT_MS = 50;

    DetailsView.prototype = {
        // Inherit the superclass's methods.
        __proto__: superClass.prototype,

        setData: function(sourceEntries) {
            // Make a copy of the array (in case the caller mutates it), and sort it
            // by the source ID.
            this.sourceEntries_ = createSortedCopy_(sourceEntries);

            // Repaint the view.
            if (this.isVisible() && !this.outstandingRepaint_) {
                this.outstandingRepaint_ = true;
                window.setTimeout(this.repaint.bind(this), REPAINT_TIMEOUT_MS);
            }
        },

        repaint: function() {
            this.outstandingRepaint_ = false;
            this.sourceIdToDivMap_ = {};
            this.getNode().innerHTML = '';

            var node = this.getNode();

            for (var i = 0; i < this.sourceEntries_.length; ++i) {
                if (i != 0)
                    addNode(node, 'hr');

                var sourceEntry = this.sourceEntries_[i];
                var div = addNode(node, 'div');
                div.className = 'log-source-entry';

                var p = addNode(div, 'p');
                addNodeWithText(
                    p, 'h4',
                    sourceEntry.getSourceId() + ': ' +
                    sourceEntry.getSourceTypeString());

                if (sourceEntry.getDescription())
                    addNodeWithText(p, 'h4', sourceEntry.getDescription());

                var logEntries = sourceEntry.getLogEntries();
                var startDate = timeutil.convertTimeTicksToDate(logEntries[0].time);
                var startTimeDiv = addNodeWithText(p, 'div', 'Start Time: ');
                timeutil.addNodeWithDate(startTimeDiv, startDate);

                sourceEntry.printAsText(div);

                this.sourceIdToDivMap_[sourceEntry.getSourceId()] = div;
            }

            if (this.outstandingScrollToId_) {
                this.scrollToSourceId(this.outstandingScrollToId_);
                this.outstandingScrollToId_ = 0;
            }
        },

        show: function(isVisible) {
            superClass.prototype.show.call(this, isVisible);
            if (isVisible) {
                this.repaint();
            } else {
                this.getNode().innerHTML = '';
            }
        },

        /**
         * Scrolls to the source indicated by |sourceId|, if displayed.  If a
         * repaint is outstanding, waits for it to complete before scrolling.
         */
        scrollToSourceId: function(sourceId) {
            if (this.outstandingRepaint_) {
                this.outstandingScrollToId_ = sourceId;
                return;
            }
            var div = this.sourceIdToDivMap_[sourceId];
            if (div)
                div.scrollIntoView();
        }
    };

    function createSortedCopy_(origArray) {
        var sortedArray = origArray.slice(0);
        sortedArray.sort(function(a, b) {
            return a.getSourceId() - b.getSourceId();
        });
        return sortedArray;
    }

    return DetailsView;
})();

// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var SourceEntry = (function() {
    'use strict';

    /**
     * A SourceEntry gathers all log entries with the same source.
     *
     * @constructor
     */
    function SourceEntry(logEntry, maxPreviousSourceId) {
        this.maxPreviousSourceId_ = maxPreviousSourceId;
        this.entries_ = [];
        this.description_ = '';

        // Set to true on most net errors.
        this.isError_ = false;

        // If the first entry is a BEGIN_PHASE, set to false.
        // Set to true when an END_PHASE matching the first entry is encountered.
        this.isInactive_ = true;

        if (logEntry.phase == EventPhase.PHASE_BEGIN)
            this.isInactive_ = false;

        this.update(logEntry);
    }

    SourceEntry.prototype = {
        update: function(logEntry) {
            // Only the last event should have the same type first event,
            if (!this.isInactive_ && logEntry.phase == EventPhase.PHASE_END &&
                logEntry.type == this.entries_[0].type) {
                this.isInactive_ = true;
            }

            // If we have a net error code, update |this.isError_| if appropriate.
            if (logEntry.params) {
                var netErrorCode = logEntry.params.net_error;
                // Skip both cases where netErrorCode is undefined, and cases where it
                // is 0, indicating no actual error occurred.
                if (netErrorCode) {
                    // Ignore error code caused by not finding an entry in the cache.
                    if (logEntry.type != EventType.HTTP_CACHE_OPEN_ENTRY ||
                        netErrorCode != NetError.ERR_FAILED) {
                        this.isError_ = true;
                    }
                }
            }

            var prevStartEntry = this.getStartEntry_();
            this.entries_.push(logEntry);
            var curStartEntry = this.getStartEntry_();

            // If we just got the first entry for this source.
            if (prevStartEntry != curStartEntry)
                this.updateDescription_();
        },

        updateDescription_: function() {
            var e = this.getStartEntry_();
            this.description_ = '';
            if (!e)
                return;

            if (e.source.type == EventSourceType.NONE) {
                // NONE is what we use for global events that aren't actually grouped
                // by a "source ID", so we will just stringize the event's type.
                this.description_ = EventTypeNames[e.type];
                return;
            }

            if (e.params == undefined) {
                return;
            }

            switch (e.source.type) {
                case EventSourceType.URL_REQUEST:
                // TODO(ricea): Remove SOCKET_STREAM after M41 is released.
                case EventSourceType.SOCKET_STREAM:
                case EventSourceType.HTTP_STREAM_JOB:
                case EventSourceType.HTTP_STREAM_JOB_CONTROLLER:
                case EventSourceType.BIDIRECTIONAL_STREAM:
                    this.description_ = e.params.url;
                    break;
                // TODO(davidben): Remove CONNECT_JOB after M57 is released.
                case EventSourceType.CONNECT_JOB:
                case EventSourceType.TRANSPORT_CONNECT_JOB:
                case EventSourceType.SSL_CONNECT_JOB:
                case EventSourceType.SOCKS_CONNECT_JOB:
                case EventSourceType.HTTP_PROXY_CONNECT_JOB:
                case EventSourceType.WEB_SOCKET_TRANSPORT_CONNECT_JOB:
                    this.description_ = e.params.group_name;
                    break;
                case EventSourceType.HOST_RESOLVER_IMPL_JOB:
                case EventSourceType.HOST_RESOLVER_IMPL_PROC_TASK:
                    this.description_ = e.params.host;
                    break;
                case EventSourceType.DISK_CACHE_ENTRY:
                case EventSourceType.MEMORY_CACHE_ENTRY:
                    this.description_ = e.params.key;
                    break;
                case EventSourceType.QUIC_SESSION:
                    if (e.params.host != undefined)
                        this.description_ = e.params.host;
                    break;
                case EventSourceType.HTTP2_SESSION:
                    if (e.params.host)
                        this.description_ = e.params.host + ' (' + e.params.proxy + ')';
                    break;
                case EventSourceType.HTTP_PIPELINED_CONNECTION:
                    if (e.params.host_and_port)
                        this.description_ = e.params.host_and_port;
                    break;
                case EventSourceType.SOCKET:
                case EventSourceType.PROXY_CLIENT_SOCKET:
                    // Use description of parent source, if any.
                    if (e.params.source_dependency != undefined) {
                        var parentId = e.params.source_dependency.id;
                        this.description_ =
                            SourceTracker.getInstance().getDescription(parentId);
                    }
                    break;
                case EventSourceType.UDP_SOCKET:
                    if (e.params.address != undefined) {
                        this.description_ = e.params.address;
                        // If the parent of |this| is a HOST_RESOLVER_IMPL_JOB, use
                        // '<DNS Server IP> [<host we're resolving>]'.
                        if (this.entries_[0].type == EventType.SOCKET_ALIVE &&
                            this.entries_[0].params &&
                            this.entries_[0].params.source_dependency != undefined) {
                            var parentId = this.entries_[0].params.source_dependency.id;
                            var parent = SourceTracker.getInstance().getSourceEntry(parentId);
                            if (parent &&
                                parent.getSourceType() ==
                                EventSourceType.HOST_RESOLVER_IMPL_JOB &&
                                parent.getDescription().length > 0) {
                                this.description_ += ' [' + parent.getDescription() + ']';
                            }
                        }
                    }
                    break;
                case EventSourceType.ASYNC_HOST_RESOLVER_REQUEST:
                case EventSourceType.DNS_TRANSACTION:
                    this.description_ = e.params.hostname;
                    break;
                case EventSourceType.DOWNLOAD:
                    switch (e.type) {
                        case EventType.DOWNLOAD_FILE_RENAMED:
                            this.description_ = e.params.new_filename;
                            break;
                        case EventType.DOWNLOAD_FILE_OPENED:
                            this.description_ = e.params.file_name;
                            break;
                        case EventType.DOWNLOAD_ITEM_ACTIVE:
                            this.description_ = e.params.file_name;
                            break;
                    }
                    break;
            }

            if (this.description_ == undefined)
                this.description_ = '';
        },

        /**
         * Returns a description for this source log stream, which will be displayed
         * in the list view. Most often this is a URL that identifies the request,
         * or a hostname for a connect job, etc...
         */
        getDescription: function() {
            return this.description_;
        },

        /**
         * Returns the starting entry for this source. Conceptually this is the
         * first entry that was logged to this source. However, we skip over the
         * TYPE_REQUEST_ALIVE entries without parameters which wrap
         * TYPE_URL_REQUEST_START_JOB entries.  (TYPE_REQUEST_ALIVE may or may not
         * have parameters depending on what version of Chromium they were
         * generated from.)
         */
        getStartEntry_: function() {
            if (this.entries_.length < 1)
                return undefined;
            if (this.entries_[0].source.type == EventSourceType.FILESTREAM) {
                var e = this.findLogEntryByType_(EventType.FILE_STREAM_OPEN);
                if (e != undefined)
                    return e;
            }
            if (this.entries_[0].source.type == EventSourceType.DOWNLOAD) {
                // If any rename occurred, use the last name
                e = this.findLastLogEntryStartByType_(EventType.DOWNLOAD_FILE_RENAMED);
                if (e != undefined)
                    return e;
                // Otherwise, if the file was opened, use that name
                e = this.findLogEntryByType_(EventType.DOWNLOAD_FILE_OPENED);
                if (e != undefined)
                    return e;
                // History items are never opened, so use the activation info
                e = this.findLogEntryByType_(EventType.DOWNLOAD_ITEM_ACTIVE);
                if (e != undefined)
                    return e;
            }
            if (this.entries_.length >= 2) {
                // Needed for compatability with log dumps prior to M26.
                // TODO(mmenke):  Remove this.
                if (this.entries_[0].type == EventType.SOCKET_POOL_CONNECT_JOB &&
                    this.entries_[0].params == undefined) {
                    return this.entries_[1];
                }
                if (this.entries_[1].type == EventType.UDP_CONNECT)
                    return this.entries_[1];
                if (this.entries_[0].type == EventType.REQUEST_ALIVE &&
                    this.entries_[0].params == undefined) {
                    var startIndex = 1;
                    // Skip over delegate events for URL_REQUESTs.
                    for (; startIndex + 1 < this.entries_.length; ++startIndex) {
                        var type = this.entries_[startIndex].type;
                        if (type != EventType.URL_REQUEST_DELEGATE &&
                            type != EventType.DELEGATE_INFO) {
                            break;
                        }
                    }
                    return this.entries_[startIndex];
                }
                if (this.entries_[1].type == EventType.IPV6_PROBE_RUNNING)
                    return this.entries_[1];
            }
            return this.entries_[0];
        },

        /**
         * Returns the first entry with the specified type, or undefined if not
         * found.
         */
        findLogEntryByType_: function(type) {
            for (var i = 0; i < this.entries_.length; ++i) {
                if (this.entries_[i].type == type) {
                    return this.entries_[i];
                }
            }
            return undefined;
        },

        /**
         * Returns the beginning of the last entry with the specified type, or
         * undefined if not found.
         */
        findLastLogEntryStartByType_: function(type) {
            for (var i = this.entries_.length - 1; i >= 0; --i) {
                if (this.entries_[i].type == type) {
                    if (this.entries_[i].phase != EventPhase.PHASE_END)
                        return this.entries_[i];
                }
            }
            return undefined;
        },

        getLogEntries: function() {
            return this.entries_;
        },

        getSourceTypeString: function() {
            return EventSourceTypeNames[this.entries_[0].source.type];
        },

        getSourceType: function() {
            return this.entries_[0].source.type;
        },

        getSourceId: function() {
            return this.entries_[0].source.id;
        },

        /**
         * Returns the largest source ID seen before this object was received.
         * Used only for sorting SourceEntries without a source by source ID.
         */
        getMaxPreviousEntrySourceId: function() {
            return this.maxPreviousSourceId_;
        },

        isInactive: function() {
            return this.isInactive_;
        },

        isError: function() {
            return this.isError_;
        },

        /**
         * Returns time ticks of first event.
         */
        getStartTicks: function() {
            return this.entries_[0].time;
        },

        /**
         * Returns time of last event if inactive.  Returns current time otherwise.
         * Returned time is a "time ticks" value.
         */
        getEndTicks: function() {
            if (!this.isInactive_)
                return timeutil.getCurrentTimeTicks();
            return this.entries_[this.entries_.length - 1].time;
        },

        /**
         * Returns the time between the first and last events with a matching
         * source ID.  If source is still active, uses the current time for the
         * last event.
         */
        getDuration: function() {
            var startTime = this.getStartTicks();
            var endTime = this.getEndTicks();
            return endTime - startTime;
        },

        /**
         * Prints descriptive text about |entries_| to a new node added to the end
         * of |parent|.
         */
        printAsText: function(parent) {
            var tablePrinter = this.createTablePrinter();

            // Format the table for fixed-width text.
            tablePrinter.toText(0, parent);
        },

        /**
         * Creates a table printer for the SourceEntry.
         */
        createTablePrinter: function() {
            return createLogEntryTablePrinter(
                this.entries_,
                SourceTracker.getInstance().getUseRelativeTimes() ?
                    timeutil.getBaseTime() :
                    0,
                Constants.clientInfo.numericDate);
        },
    };

    return SourceEntry;
})();

// // Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * This view consists of two nested divs.  The outer one has a horizontal
 * scrollbar and the inner one has a height of 1 pixel and a width set to
 * allow an appropriate scroll range.  The view reports scroll events to
 * a callback specified on construction.
 *
 * All this funkiness is necessary because there is no HTML scroll control.
 * TODO(mmenke):  Consider implementing our own scrollbar directly.
 */
var HorizontalScrollbarView = (function() {
    'use strict';

    // We inherit from DivView.
    var superClass = DivView;

    /**
     * @constructor
     */
    function HorizontalScrollbarView(divId, innerDivId, callback) {
        superClass.call(this, divId);
        this.callback_ = callback;
        this.innerDiv_ = $(innerDivId);
        $(divId).onscroll = this.onScroll_.bind(this);

        // The current range and position of the scrollbar.  Because DOM updates
        // are asynchronous, the current state cannot be read directly from the DOM
        // after updating the range.
        this.range_ = 0;
        this.position_ = 0;

        // The DOM updates asynchronously, so sometimes we need a timer to update
        // the current scroll position after resizing the scrollbar.
        this.updatePositionTimerId_ = null;
    }

    HorizontalScrollbarView.prototype = {
        // Inherit the superclass's methods.
        __proto__: superClass.prototype,

        setGeometry: function(left, top, width, height) {
            superClass.prototype.setGeometry.call(this, left, top, width, height);
            this.setRange(this.range_);
        },

        show: function(isVisible) {
            superClass.prototype.show.call(this, isVisible);
        },

        /**
         * Sets the range of the scrollbar.  The scrollbar can have a value
         * anywhere from 0 to |range|, inclusive.  The width of the drag area
         * on the scrollbar will generally be based on the width of the scrollbar
         * relative to the size of |range|, so if the scrollbar is about the size
         * of the thing we're scrolling, we get fairly nice behavior.
         *
         * If |range| is less than the original position, |position_| is set to
         * |range|.  Otherwise, it is not modified.
         */
        setRange: function(range) {
            this.range_ = range;
            setNodeWidth(this.innerDiv_, this.getWidth() + range);
            if (range < this.position_)
                this.position_ = range;
            this.setPosition(this.position_);
        },

        /**
         * Sets the position of the scrollbar.  |position| must be between 0 and
         * |range_|, inclusive.
         */
        setPosition: function(position) {
            this.position_ = position;
            this.updatePosition_();
        },

        /**
         * Updates the visible position of the scrollbar to be |position_|.
         * On failure, calls itself again after a timeout.  This is needed because
         * setRange does not synchronously update the DOM.
         */
        updatePosition_: function() {
            // Clear the timer if we have one, so we don't have two timers running at
            // once.  This is safe even if we were just called from the timer, in
            // which case clearTimeout will silently fail.
            if (this.updatePositionTimerId_ !== null) {
                window.clearTimeout(this.updatePositionTimerId_);
                this.updatePositionTimerId_ = null;
            }

            this.getNode().scrollLeft = this.position_;
            if (this.getNode().scrollLeft != this.position_) {
                this.updatePositionTimerId_ =
                    window.setTimeout(this.updatePosition_.bind(this));
            }
        },

        getRange: function() {
            return this.range_;
        },

        getPosition: function() {
            return this.position_;
        },

        onScroll_: function() {
            // If we're waiting to update the range, ignore messages from the
            // scrollbar.
            if (this.updatePositionTimerId_ !== null)
                return;
            var newPosition = this.getNode().scrollLeft;
            if (newPosition == this.position_)
                return;
            this.position_ = newPosition;
            this.callback_();
        }
    };

    return HorizontalScrollbarView;
})();

// // Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var TopMidBottomView = (function() {
    'use strict';

    // We inherit from View.
    var superClass = View;

    /**
     * This view stacks three boxes -- one at the top, one at the bottom, and
     * one that fills the remaining space between those two.  Either the top
     * or the bottom bar may be null.
     *
     *  +----------------------+
     *  |      topbar          |
     *  +----------------------+
     *  |                      |
     *  |                      |
     *  |                      |
     *  |                      |
     *  |      middlebox       |
     *  |                      |
     *  |                      |
     *  |                      |
     *  |                      |
     *  |                      |
     *  +----------------------+
     *  |     bottombar        |
     *  +----------------------+
     *
     *  @constructor
     */
    function TopMidBottomView(topView, midView, bottomView) {
        superClass.call(this);

        this.topView_ = topView;
        this.midView_ = midView;
        this.bottomView_ = bottomView;
    }

    TopMidBottomView.prototype = {
        // Inherit the superclass's methods.
        __proto__: superClass.prototype,

        setGeometry: function(left, top, width, height) {
            superClass.prototype.setGeometry.call(this, left, top, width, height);

            // Calculate the vertical split points.
            var topbarHeight = 0;
            if (this.topView_)
                topbarHeight = this.topView_.getHeight();
            var bottombarHeight = 0;
            if (this.bottomView_)
                bottombarHeight = this.bottomView_.getHeight();
            var middleboxHeight = height - (topbarHeight + bottombarHeight);
            if (middleboxHeight < 0)
                middleboxHeight = 0;

            // Position the boxes using calculated split points.
            if (this.topView_)
                this.topView_.setGeometry(left, top, width, topbarHeight);
            this.midView_.setGeometry(
                left, top + topbarHeight, width, middleboxHeight);
            if (this.bottomView_) {
                this.bottomView_.setGeometry(
                    left, top + topbarHeight + middleboxHeight, width, bottombarHeight);
            }
        },

        show: function(isVisible) {
            superClass.prototype.show.call(this, isVisible);
            if (this.topView_)
                this.topView_.show(isVisible);
            this.midView_.show(isVisible);
            if (this.bottomView_)
                this.bottomView_.show(isVisible);
        }
    };

    return TopMidBottomView;
})();

// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Different data types that each require their own labelled axis.
 */
var TimelineDataType = {SOURCE_COUNT: 0, BYTES_PER_SECOND: 1};

/**
 * A TimelineDataSeries collects an ordered series of (time, value) pairs,
 * and converts them to graph points.  It also keeps track of its color and
 * current visibility state.  DataSeries are solely responsible for tracking
 * data, and do not send notifications on state changes.
 *
 * Abstract class, doesn't implement onReceivedLogEntry.
 */
var TimelineDataSeries = (function() {
    'use strict';

    /**
     * @constructor
     */
    function TimelineDataSeries(dataType) {
        // List of DataPoints in chronological order.
        this.dataPoints_ = [];

        // Data type of the DataSeries.  This is used to scale all values with
        // the same units in the same way.
        this.dataType_ = dataType;
        // Default color.  Should always be overridden prior to display.
        this.color_ = 'red';
        // Whether or not the data series should be drawn.
        this.isVisible_ = false;

        this.cacheStartTime_ = null;
        this.cacheStepSize_ = 0;
        this.cacheValues_ = [];
    }

    TimelineDataSeries.prototype = {
        /**
         * Adds a DataPoint to |this| with the specified time and value.
         * DataPoints are assumed to be received in chronological order.
         */
        addPoint: function(timeTicks, value) {
            var time = timeutil.convertTimeTicksToDate(timeTicks).getTime();
            this.dataPoints_.push(new DataPoint(time, value));
        },

        isVisible: function() {
            return this.isVisible_;
        },

        show: function(isVisible) {
            this.isVisible_ = isVisible;
        },

        getColor: function() {
            return this.color_;
        },

        setColor: function(color) {
            this.color_ = color;
        },

        getDataType: function() {
            return this.dataType_;
        },

        /**
         * Returns a list containing the values of the data series at |count|
         * points, starting at |startTime|, and |stepSize| milliseconds apart.
         * Caches values, so showing/hiding individual data series is fast, and
         * derived data series can be efficiently computed, if we add any.
         */
        getValues: function(startTime, stepSize, count) {
            // Use cached values, if we can.
            if (this.cacheStartTime_ == startTime &&
                this.cacheStepSize_ == stepSize &&
                this.cacheValues_.length == count) {
                return this.cacheValues_;
            }

            // Do all the work.
            this.cacheValues_ = this.getValuesInternal_(startTime, stepSize, count);
            this.cacheStartTime_ = startTime;
            this.cacheStepSize_ = stepSize;

            return this.cacheValues_;
        },

        /**
         * Does all the work of getValues when we can't use cached data.
         *
         * The default implementation just uses the |value| of the most recently
         * seen DataPoint before each time, but other DataSeries may use some
         * form of interpolation.
         * TODO(mmenke):  Consider returning the maximum value over each interval
         *                to create graphs more stable with respect to zooming.
         */
        getValuesInternal_: function(startTime, stepSize, count) {
            var values = [];
            var nextPoint = 0;
            var currentValue = 0;
            var time = startTime;
            for (var i = 0; i < count; ++i) {
                while (nextPoint < this.dataPoints_.length &&
                this.dataPoints_[nextPoint].time < time) {
                    currentValue = this.dataPoints_[nextPoint].value;
                    ++nextPoint;
                }
                values[i] = currentValue;
                time += stepSize;
            }
            return values;
        }
    };

    /**
     * A single point in a data series.  Each point has a time, in the form of
     * milliseconds since the Unix epoch, and a numeric value.
     * @constructor
     */
    function DataPoint(time, value) {
        this.time = time;
        this.value = value;
    }

    return TimelineDataSeries;
})();

/**
 * Tracks how many sources of the given type have seen a begin
 * event of type |eventType| more recently than an end event.
 */
var SourceCountDataSeries = (function() {
    'use strict';

    var superClass = TimelineDataSeries;

    /**
     * @constructor
     */
    function SourceCountDataSeries(sourceType, eventType) {
        superClass.call(this, TimelineDataType.SOURCE_COUNT);
        this.sourceType_ = sourceType;
        this.eventType_ = eventType;

        // Map of sources for which we've seen a begin event more recently than an
        // end event.  Each such source has a value of "true".  All others are
        // undefined.
        this.activeSources_ = {};
        // Number of entries in |activeSources_|.
        this.activeCount_ = 0;
    }

    SourceCountDataSeries.prototype = {
        // Inherit the superclass's methods.
        __proto__: superClass.prototype,

        onReceivedLogEntry: function(entry) {
            if (entry.source.type != this.sourceType_ ||
                entry.type != this.eventType_) {
                return;
            }

            if (entry.phase == EventPhase.PHASE_BEGIN) {
                this.onBeginEvent(entry.source.id, entry.time);
                return;
            }
            if (entry.phase == EventPhase.PHASE_END)
                this.onEndEvent(entry.source.id, entry.time);
        },

        /**
         * Called when the source with the specified id begins doing whatever we
         * care about.  If it's not already an active source, we add it to the map
         * and add a data point.
         */
        onBeginEvent: function(id, time) {
            if (this.activeSources_[id])
                return;
            this.activeSources_[id] = true;
            ++this.activeCount_;
            this.addPoint(time, this.activeCount_);
        },

        /**
         * Called when the source with the specified id stops doing whatever we
         * care about.  If it's an active source, we remove it from the map and add
         * a data point.
         */
        onEndEvent: function(id, time) {
            if (!this.activeSources_[id])
                return;
            delete this.activeSources_[id];
            --this.activeCount_;
            this.addPoint(time, this.activeCount_);
        }
    };

    return SourceCountDataSeries;
})();

/**
 * Tracks the number of sockets currently in use.  Needs special handling of
 * SSL sockets, so can't just use a normal SourceCountDataSeries.
 */
var SocketsInUseDataSeries = (function() {
    'use strict';

    var superClass = SourceCountDataSeries;

    /**
     * @constructor
     */
    function SocketsInUseDataSeries() {
        superClass.call(this, EventSourceType.SOCKET, EventType.SOCKET_IN_USE);
    }

    SocketsInUseDataSeries.prototype = {
        // Inherit the superclass's methods.
        __proto__: superClass.prototype,

        onReceivedLogEntry: function(entry) {
            // SSL sockets have two nested SOCKET_IN_USE events.  This is needed to
            // mark SSL sockets as unused after SSL negotiation.
            if (entry.type == EventType.SSL_CONNECT &&
                entry.phase == EventPhase.PHASE_END) {
                this.onEndEvent(entry.source.id, entry.time);
                return;
            }
            superClass.prototype.onReceivedLogEntry.call(this, entry);
        }
    };

    return SocketsInUseDataSeries;
})();

/**
 * Tracks approximate data rate using individual data transfer events.
 * Abstract class, doesn't implement onReceivedLogEntry.
 */
var TransferRateDataSeries = (function() {
    'use strict';

    var superClass = TimelineDataSeries;

    /**
     * @constructor
     */
    function TransferRateDataSeries() {
        superClass.call(this, TimelineDataType.BYTES_PER_SECOND);
    }

    TransferRateDataSeries.prototype = {
        // Inherit the superclass's methods.
        __proto__: superClass.prototype,

        /**
         * Returns the average data rate over each interval, only taking into
         * account transfers that occurred within each interval.
         * TODO(mmenke): Do something better.
         */
        getValuesInternal_: function(startTime, stepSize, count) {
            // Find the first DataPoint after |startTime| - |stepSize|.
            var nextPoint = 0;
            while (nextPoint < this.dataPoints_.length &&
            this.dataPoints_[nextPoint].time < startTime - stepSize) {
                ++nextPoint;
            }

            var values = [];
            var time = startTime;
            for (var i = 0; i < count; ++i) {
                // Calculate total bytes transferred from |time| - |stepSize|
                // to |time|.  We look at the transfers before |time| to give
                // us generally non-varying values for a given time.
                var transferred = 0;
                while (nextPoint < this.dataPoints_.length &&
                this.dataPoints_[nextPoint].time < time) {
                    transferred += this.dataPoints_[nextPoint].value;
                    ++nextPoint;
                }
                // Calculate bytes per second.
                values[i] = 1000 * transferred / stepSize;
                time += stepSize;
            }
            return values;
        }
    };

    return TransferRateDataSeries;
})();

/**
 * Tracks TCP and UDP transfer rate.
 */
var NetworkTransferRateDataSeries = (function() {
    'use strict';

    var superClass = TransferRateDataSeries;

    /**
     * |tcpEvent| and |udpEvent| are the event types for data transfers using
     * TCP and UDP, respectively.
     * @constructor
     */
    function NetworkTransferRateDataSeries(tcpEvent, udpEvent) {
        superClass.call(this);
        this.tcpEvent_ = tcpEvent;
        this.udpEvent_ = udpEvent;
    }

    NetworkTransferRateDataSeries.prototype = {
        // Inherit the superclass's methods.
        __proto__: superClass.prototype,

        onReceivedLogEntry: function(entry) {
            if (entry.type != this.tcpEvent_ && entry.type != this.udpEvent_)
                return;
            this.addPoint(entry.time, entry.params.byte_count);
        },
    };

    return NetworkTransferRateDataSeries;
})();

/**
 * Tracks disk cache read or write rate.  Doesn't include clearing, opening,
 * or dooming entries, as they don't have clear size values.
 */
var DiskCacheTransferRateDataSeries = (function() {
    'use strict';

    var superClass = TransferRateDataSeries;

    /**
     * @constructor
     */
    function DiskCacheTransferRateDataSeries(eventType) {
        superClass.call(this);
        this.eventType_ = eventType;
    }

    DiskCacheTransferRateDataSeries.prototype = {
        // Inherit the superclass's methods.
        __proto__: superClass.prototype,

        onReceivedLogEntry: function(entry) {
            if (entry.source.type != EventSourceType.DISK_CACHE_ENTRY ||
                entry.type != this.eventType_ ||
                entry.phase != EventPhase.PHASE_END) {
                return;
            }
            // The disk cache has a lot of 0-length writes, when truncating entries.
            // Ignore those.
            if (entry.params.bytes_copied != 0)
                this.addPoint(entry.time, entry.params.bytes_copied);
        }
    };

    return DiskCacheTransferRateDataSeries;
})();

// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * A TimelineGraphView displays a timeline graph on a canvas element.
 */
var TimelineGraphView = (function() {
    'use strict';
    // We inherit from TopMidBottomView.
    var superClass = TopMidBottomView;

    // Default starting scale factor, in terms of milliseconds per pixel.
    var DEFAULT_SCALE = 1000;

    // Maximum number of labels placed vertically along the sides of the graph.
    var MAX_VERTICAL_LABELS = 6;

    // Vertical spacing between labels and between the graph and labels.
    var LABEL_VERTICAL_SPACING = 4;
    // Horizontal spacing between vertically placed labels and the edges of the
    // graph.
    var LABEL_HORIZONTAL_SPACING = 3;
    // Horizintal spacing between two horitonally placed labels along the bottom
    // of the graph.
    var LABEL_LABEL_HORIZONTAL_SPACING = 25;

    // Length of ticks, in pixels, next to y-axis labels.  The x-axis only has
    // one set of labels, so it can use lines instead.
    var Y_AXIS_TICK_LENGTH = 10;

    // The number of units mouse wheel deltas increase for each tick of the
    // wheel.
    var MOUSE_WHEEL_UNITS_PER_CLICK = 120;

    // Amount we zoom for one vertical tick of the mouse wheel, as a ratio.
    var MOUSE_WHEEL_ZOOM_RATE = 1.25;
    // Amount we scroll for one horizontal tick of the mouse wheel, in pixels.
    var MOUSE_WHEEL_SCROLL_RATE = MOUSE_WHEEL_UNITS_PER_CLICK;
    // Number of pixels to scroll per pixel the mouse is dragged.
    var MOUSE_WHEEL_DRAG_RATE = 3;

    var GRID_COLOR = '#CCC';
    var TEXT_COLOR = '#000';
    var BACKGROUND_COLOR = '#FFF';

    // Which side of the canvas y-axis labels should go on, for a given Graph.
    // TODO(mmenke):  Figure out a reasonable way to handle more than 2 sets
    //                of labels.
    var LabelAlign = {LEFT: 0, RIGHT: 1};

    /**
     * @constructor
     */
    function TimelineGraphView(divId, canvasId, scrollbarId, scrollbarInnerId) {
        this.scrollbar_ = new HorizontalScrollbarView(
            scrollbarId, scrollbarInnerId, this.onScroll_.bind(this));
        // Call superclass's constructor.
        superClass.call(this, null, new DivView(divId), this.scrollbar_);

        this.graphDiv_ = $(divId);
        this.canvas_ = $(canvasId);
        this.canvas_.onmousewheel = this.onMouseWheel_.bind(this);
        this.canvas_.onmousedown = this.onMouseDown_.bind(this);
        this.canvas_.onmousemove = this.onMouseMove_.bind(this);
        this.canvas_.onmouseup = this.onMouseUp_.bind(this);
        this.canvas_.onmouseout = this.onMouseUp_.bind(this);

        // Used for click and drag scrolling of graph.  Drag-zooming not supported,
        // for a more stable scrolling experience.
        this.isDragging_ = false;
        this.dragX_ = 0;

        // Set the range and scale of the graph.  Times are in milliseconds since
        // the Unix epoch.

        // All measurements we have must be after this time.
        this.startTime_ = 0;
        // The current rightmost position of the graph is always at most this.
        // We may have some later events.  When actively capturing new events, it's
        // updated on a timer.
        this.endTime_ = 1;

        // Current scale, in terms of milliseconds per pixel.  Each column of
        // pixels represents a point in time |scale_| milliseconds after the
        // previous one.  We only display times that are of the form
        // |startTime_| + K * |scale_| to avoid jittering, and the rightmost
        // pixel that we can display has a time <= |endTime_|.  Non-integer values
        // are allowed.
        this.scale_ = DEFAULT_SCALE;

        this.graphs_ = [];

        // Initialize the scrollbar.
        this.updateScrollbarRange_(true);
    }

    // Smallest allowed scaling factor.
    TimelineGraphView.MIN_SCALE = 5;

    TimelineGraphView.prototype = {
        // Inherit the superclass's methods.
        __proto__: superClass.prototype,

        setGeometry: function(left, top, width, height) {
            superClass.prototype.setGeometry.call(this, left, top, width, height);

            // The size of the canvas can only be set by using its |width| and
            // |height| properties, which do not take padding into account, so we
            // need to use them ourselves.
            var style = getComputedStyle(this.canvas_);
            var horizontalPadding =
                parseInt(style.paddingRight) + parseInt(style.paddingLeft);
            var verticalPadding =
                parseInt(style.paddingTop) + parseInt(style.paddingBottom);
            var canvasWidth =
                parseInt(this.graphDiv_.style.width) - horizontalPadding;
            // For unknown reasons, there's an extra 3 pixels border between the
            // bottom of the canvas and the bottom margin of the enclosing div.
            var canvasHeight =
                parseInt(this.graphDiv_.style.height) - verticalPadding - 3;

            // Protect against degenerates.
            if (canvasWidth < 10)
                canvasWidth = 10;
            if (canvasHeight < 10)
                canvasHeight = 10;

            this.canvas_.width = canvasWidth;
            this.canvas_.height = canvasHeight;

            // Use the same font style for the canvas as we use elsewhere.
            // Has to be updated every resize.
            this.canvas_.getContext('2d').font = getComputedStyle(this.canvas_).font;

            this.updateScrollbarRange_(this.graphScrolledToRightEdge_());
            this.repaint();
        },

        show: function(isVisible) {
            superClass.prototype.show.call(this, isVisible);
            if (isVisible)
                this.repaint();
        },

        // Returns the total length of the graph, in pixels.
        getLength_: function() {
            var timeRange = this.endTime_ - this.startTime_;
            // Math.floor is used to ignore the last partial area, of length less
            // than |scale_|.
            return Math.floor(timeRange / this.scale_);
        },

        /**
         * Returns true if the graph is scrolled all the way to the right.
         */
        graphScrolledToRightEdge_: function() {
            return this.scrollbar_.getPosition() == this.scrollbar_.getRange();
        },

        /**
         * Update the range of the scrollbar.  If |resetPosition| is true, also
         * sets the slider to point at the rightmost position and triggers a
         * repaint.
         */
        updateScrollbarRange_: function(resetPosition) {
            var scrollbarRange = this.getLength_() - this.canvas_.width;
            if (scrollbarRange < 0)
                scrollbarRange = 0;

            // If we've decreased the range to less than the current scroll position,
            // we need to move the scroll position.
            if (this.scrollbar_.getPosition() > scrollbarRange)
                resetPosition = true;

            this.scrollbar_.setRange(scrollbarRange);
            if (resetPosition) {
                this.scrollbar_.setPosition(scrollbarRange);
                this.repaint();
            }
        },

        /**
         * Sets the date range displayed on the graph, switches to the default
         * scale factor, and moves the scrollbar all the way to the right.
         */
        setDateRange: function(startDate, endDate) {
            this.startTime_ = startDate.getTime();
            this.endTime_ = endDate.getTime();

            // Safety check.
            if (this.endTime_ <= this.startTime_)
                this.startTime_ = this.endTime_ - 1;

            this.scale_ = DEFAULT_SCALE;
            this.updateScrollbarRange_(true);
        },

        /**
         * Updates the end time at the right of the graph to be the current time.
         * Specifically, updates the scrollbar's range, and if the scrollbar is
         * all the way to the right, keeps it all the way to the right.  Otherwise,
         * leaves the view as-is and doesn't redraw anything.
         */
        updateEndDate: function() {
            this.endTime_ = timeutil.getCurrentTime();
            this.updateScrollbarRange_(this.graphScrolledToRightEdge_());
        },

        getStartDate: function() {
            return new Date(this.startTime_);
        },

        /**
         * Scrolls the graph horizontally by the specified amount.
         */
        horizontalScroll_: function(delta) {
            var newPosition = this.scrollbar_.getPosition() + Math.round(delta);
            // Make sure the new position is in the right range.
            if (newPosition < 0) {
                newPosition = 0;
            } else if (newPosition > this.scrollbar_.getRange()) {
                newPosition = this.scrollbar_.getRange();
            }

            if (this.scrollbar_.getPosition() == newPosition)
                return;
            this.scrollbar_.setPosition(newPosition);
            this.onScroll_();
        },

        /**
         * Zooms the graph by the specified amount.
         */
        zoom_: function(ratio) {
            var oldScale = this.scale_;
            this.scale_ *= ratio;
            if (this.scale_ < TimelineGraphView.MIN_SCALE)
                this.scale_ = TimelineGraphView.MIN_SCALE;

            if (this.scale_ == oldScale)
                return;

            // If we were at the end of the range before, remain at the end of the
            // range.
            if (this.graphScrolledToRightEdge_()) {
                this.updateScrollbarRange_(true);
                return;
            }

            // Otherwise, do our best to maintain the old position.  We use the
            // position at the far right of the graph for consistency.
            var oldMaxTime =
                oldScale * (this.scrollbar_.getPosition() + this.canvas_.width);
            var newMaxTime = Math.round(oldMaxTime / this.scale_);
            var newPosition = newMaxTime - this.canvas_.width;

            // Update range and scroll position.
            this.updateScrollbarRange_(false);
            this.horizontalScroll_(newPosition - this.scrollbar_.getPosition());
        },

        onMouseWheel_: function(event) {
            event.preventDefault();
            this.horizontalScroll_(
                MOUSE_WHEEL_SCROLL_RATE * -event.wheelDeltaX /
                MOUSE_WHEEL_UNITS_PER_CLICK);
            this.zoom_(Math.pow(
                MOUSE_WHEEL_ZOOM_RATE,
                -event.wheelDeltaY / MOUSE_WHEEL_UNITS_PER_CLICK));
        },

        onMouseDown_: function(event) {
            event.preventDefault();
            this.isDragging_ = true;
            this.dragX_ = event.clientX;
        },

        onMouseMove_: function(event) {
            if (!this.isDragging_)
                return;
            event.preventDefault();
            this.horizontalScroll_(
                MOUSE_WHEEL_DRAG_RATE * (event.clientX - this.dragX_));
            this.dragX_ = event.clientX;
        },

        onMouseUp_: function(event) {
            this.isDragging_ = false;
        },

        onScroll_: function() {
            this.repaint();
        },

        /**
         * Replaces the current TimelineDataSeries with |dataSeries|.
         */
        setDataSeries: function(dataSeries) {
            // Simplest just to recreate the Graphs.
            this.graphs_ = [];
            this.graphs_[TimelineDataType.BYTES_PER_SECOND] =
                new Graph(TimelineDataType.BYTES_PER_SECOND, LabelAlign.RIGHT);
            this.graphs_[TimelineDataType.SOURCE_COUNT] =
                new Graph(TimelineDataType.SOURCE_COUNT, LabelAlign.LEFT);
            for (var i = 0; i < dataSeries.length; ++i)
                this.graphs_[dataSeries[i].getDataType()].addDataSeries(dataSeries[i]);

            this.repaint();
        },

        /**
         * Draws the graph on |canvas_|.
         */
        repaint: function() {
            this.repaintTimerRunning_ = false;
            if (!this.isVisible())
                return;

            var width = this.canvas_.width;
            var height = this.canvas_.height;
            var context = this.canvas_.getContext('2d');

            // Clear the canvas.
            context.fillStyle = BACKGROUND_COLOR;
            context.fillRect(0, 0, width, height);

            // Try to get font height in pixels.  Needed for layout.
            var fontHeightString = context.font.match(/([0-9]+)px/)[1];
            var fontHeight = parseInt(fontHeightString);

            // Safety check, to avoid drawing anything too ugly.
            if (fontHeightString.length == 0 || fontHeight <= 0 ||
                fontHeight * 4 > height || width < 50) {
                return;
            }

            // Save current transformation matrix so we can restore it later.
            context.save();

            // The center of an HTML canvas pixel is technically at (0.5, 0.5).  This
            // makes near straight lines look bad, due to anti-aliasing.  This
            // translation reduces the problem a little.
            context.translate(0.5, 0.5);

            // Figure out what time values to display.
            var position = this.scrollbar_.getPosition();
            // If the entire time range is being displayed, align the right edge of
            // the graph to the end of the time range.
            if (this.scrollbar_.getRange() == 0)
                position = this.getLength_() - this.canvas_.width;
            var visibleStartTime = this.startTime_ + position * this.scale_;

            // Make space at the bottom of the graph for the time labels, and then
            // draw the labels.
            var textHeight = height;
            height -= fontHeight + LABEL_VERTICAL_SPACING;
            this.drawTimeLabels(context, width, height, textHeight, visibleStartTime);

            // Draw outline of the main graph area.
            context.strokeStyle = GRID_COLOR;
            context.strokeRect(0, 0, width - 1, height - 1);

            // Layout graphs and have them draw their tick marks.
            for (var i = 0; i < this.graphs_.length; ++i) {
                this.graphs_[i].layout(
                    width, height, fontHeight, visibleStartTime, this.scale_);
                this.graphs_[i].drawTicks(context);
            }

            // Draw the lines of all graphs, and then draw their labels.
            for (var i = 0; i < this.graphs_.length; ++i)
                this.graphs_[i].drawLines(context);
            for (var i = 0; i < this.graphs_.length; ++i)
                this.graphs_[i].drawLabels(context);

            // Restore original transformation matrix.
            context.restore();
        },

        /**
         * Draw time labels below the graph.  Takes in start time as an argument
         * since it may not be |startTime_|, when we're displaying the entire
         * time range.
         */
        drawTimeLabels: function(context, width, height, textHeight, startTime) {
            // Text for a time string to use in determining how far apart
            // to place text labels.
            var sampleText = (new Date(startTime)).toLocaleTimeString();

            // The desired spacing for text labels.
            var targetSpacing = context.measureText(sampleText).width +
                LABEL_LABEL_HORIZONTAL_SPACING;

            // The allowed time step values between adjacent labels.  Anything much
            // over a couple minutes isn't terribly realistic, given how much memory
            // we use, and how slow a lot of the net-internals code is.
            var timeStepValues = [
                1000,  // 1 second
                1000 * 5, 1000 * 30,
                1000 * 60,  // 1 minute
                1000 * 60 * 5, 1000 * 60 * 30,
                1000 * 60 * 60,  // 1 hour
                1000 * 60 * 60 * 5
            ];

            // Find smallest time step value that gives us at least |targetSpacing|,
            // if any.
            var timeStep = null;
            for (var i = 0; i < timeStepValues.length; ++i) {
                if (timeStepValues[i] / this.scale_ >= targetSpacing) {
                    timeStep = timeStepValues[i];
                    break;
                }
            }

            // If no such value, give up.
            if (!timeStep)
                return;

            // Find the time for the first label.  This time is a perfect multiple of
            // timeStep because of how UTC times work.
            var time = Math.ceil(startTime / timeStep) * timeStep;

            context.textBaseline = 'bottom';
            context.textAlign = 'center';
            context.fillStyle = TEXT_COLOR;
            context.strokeStyle = GRID_COLOR;

            // Draw labels and vertical grid lines.
            while (true) {
                var x = Math.round((time - startTime) / this.scale_);
                if (x >= width)
                    break;
                var text = (new Date(time)).toLocaleTimeString();
                context.fillText(text, x, textHeight);
                context.beginPath();
                context.lineTo(x, 0);
                context.lineTo(x, height);
                context.stroke();
                time += timeStep;
            }
        }
    };

    /**
     * A Graph is responsible for drawing all the TimelineDataSeries that have
     * the same data type.  Graphs are responsible for scaling the values, laying
     * out labels, and drawing both labels and lines for its data series.
     */
    var Graph = (function() {
        /**
         * |dataType| is the DataType that will be shared by all its DataSeries.
         * |labelAlign| is the LabelAlign value indicating whether the labels
         * should be aligned to the right of left of the graph.
         * @constructor
         */
        function Graph(dataType, labelAlign) {
            this.dataType_ = dataType;
            this.dataSeries_ = [];
            this.labelAlign_ = labelAlign;

            // Cached properties of the graph, set in layout.
            this.width_ = 0;
            this.height_ = 0;
            this.fontHeight_ = 0;
            this.startTime_ = 0;
            this.scale_ = 0;

            // At least the highest value in the displayed range of the graph.
            // Used for scaling and setting labels.  Set in layoutLabels.
            this.max_ = 0;

            // Cached text of equally spaced labels.  Set in layoutLabels.
            this.labels_ = [];
        }

        /**
         * A Label is the label at a particular position along the y-axis.
         * @constructor
         */
        function Label(height, text) {
            this.height = height;
            this.text = text;
        }

        Graph.prototype = {
            addDataSeries: function(dataSeries) {
                this.dataSeries_.push(dataSeries);
            },

            /**
             * Returns a list of all the values that should be displayed for a given
             * data series, using the current graph layout.
             */
            getValues: function(dataSeries) {
                if (!dataSeries.isVisible())
                    return null;
                return dataSeries.getValues(this.startTime_, this.scale_, this.width_);
            },

            /**
             * Updates the graph's layout.  In particular, both the max value and
             * label positions are updated.  Must be called before calling any of the
             * drawing functions.
             */
            layout: function(width, height, fontHeight, startTime, scale) {
                this.width_ = width;
                this.height_ = height;
                this.fontHeight_ = fontHeight;
                this.startTime_ = startTime;
                this.scale_ = scale;

                // Find largest value.
                var max = 0;
                for (var i = 0; i < this.dataSeries_.length; ++i) {
                    var values = this.getValues(this.dataSeries_[i]);
                    if (!values)
                        continue;
                    for (var j = 0; j < values.length; ++j) {
                        if (values[j] > max)
                            max = values[j];
                    }
                }

                this.layoutLabels_(max);
            },

            /**
             * Lays out labels and sets |max_|, taking the time units into
             * consideration.  |maxValue| is the actual maximum value, and
             * |max_| will be set to the value of the largest label, which
             * will be at least |maxValue|.
             */
            layoutLabels_: function(maxValue) {
                if (this.dataType_ != TimelineDataType.BYTES_PER_SECOND) {
                    this.layoutLabelsBasic_(maxValue, 0);
                    return;
                }

                // Special handling for data rates.

                // Find appropriate units to use.
                var units = ['B/s', 'kB/s', 'MB/s', 'GB/s', 'TB/s', 'PB/s'];
                // Units to use for labels.  0 is bytes, 1 is kilobytes, etc.
                // We start with kilobytes, and work our way up.
                var unit = 1;
                // Update |maxValue| to be in the right units.
                maxValue = maxValue / 1024;
                while (units[unit + 1] && maxValue >= 999) {
                    maxValue /= 1024;
                    ++unit;
                }

                // Calculate labels.
                this.layoutLabelsBasic_(maxValue, 1);

                // Append units to labels.
                for (var i = 0; i < this.labels_.length; ++i)
                    this.labels_[i] += ' ' + units[unit];

                // Convert |max_| back to bytes, so it can be used when scaling values
                // for display.
                this.max_ *= Math.pow(1024, unit);
            },

            /**
             * Same as layoutLabels_, but ignores units.  |maxDecimalDigits| is the
             * maximum number of decimal digits allowed.  The minimum allowed
             * difference between two adjacent labels is 10^-|maxDecimalDigits|.
             */
            layoutLabelsBasic_: function(maxValue, maxDecimalDigits) {
                this.labels_ = [];
                // No labels if |maxValue| is 0.
                if (maxValue == 0) {
                    this.max_ = maxValue;
                    return;
                }

                // The maximum number of equally spaced labels allowed.  |fontHeight_|
                // is doubled because the top two labels are both drawn in the same
                // gap.
                var minLabelSpacing = 2 * this.fontHeight_ + LABEL_VERTICAL_SPACING;

                // The + 1 is for the top label.
                var maxLabels = 1 + this.height_ / minLabelSpacing;
                if (maxLabels < 2) {
                    maxLabels = 2;
                } else if (maxLabels > MAX_VERTICAL_LABELS) {
                    maxLabels = MAX_VERTICAL_LABELS;
                }

                // Initial try for step size between conecutive labels.
                var stepSize = Math.pow(10, -maxDecimalDigits);
                // Number of digits to the right of the decimal of |stepSize|.
                // Used for formating label strings.
                var stepSizeDecimalDigits = maxDecimalDigits;

                // Pick a reasonable step size.
                while (true) {
                    // If we use a step size of |stepSize| between labels, we'll need:
                    //
                    // Math.ceil(maxValue / stepSize) + 1
                    //
                    // labels.  The + 1 is because we need labels at both at 0 and at
                    // the top of the graph.

                    // Check if we can use steps of size |stepSize|.
                    if (Math.ceil(maxValue / stepSize) + 1 <= maxLabels)
                        break;
                    // Check |stepSize| * 2.
                    if (Math.ceil(maxValue / (stepSize * 2)) + 1 <= maxLabels) {
                        stepSize *= 2;
                        break;
                    }
                    // Check |stepSize| * 5.
                    if (Math.ceil(maxValue / (stepSize * 5)) + 1 <= maxLabels) {
                        stepSize *= 5;
                        break;
                    }
                    stepSize *= 10;
                    if (stepSizeDecimalDigits > 0)
                        --stepSizeDecimalDigits;
                }

                // Set the max so it's an exact multiple of the chosen step size.
                this.max_ = Math.ceil(maxValue / stepSize) * stepSize;

                // Create labels.
                for (var label = this.max_; label >= 0; label -= stepSize)
                    this.labels_.push(label.toFixed(stepSizeDecimalDigits));
            },

            /**
             * Draws tick marks for each of the labels in |labels_|.
             */
            drawTicks: function(context) {
                var x1;
                var x2;
                if (this.labelAlign_ == LabelAlign.RIGHT) {
                    x1 = this.width_ - 1;
                    x2 = this.width_ - 1 - Y_AXIS_TICK_LENGTH;
                } else {
                    x1 = 0;
                    x2 = Y_AXIS_TICK_LENGTH;
                }

                context.fillStyle = GRID_COLOR;
                context.beginPath();
                for (var i = 1; i < this.labels_.length - 1; ++i) {
                    // The rounding is needed to avoid ugly 2-pixel wide anti-aliased
                    // lines.
                    var y = Math.round(this.height_ * i / (this.labels_.length - 1));
                    context.moveTo(x1, y);
                    context.lineTo(x2, y);
                }
                context.stroke();
            },

            /**
             * Draws a graph line for each of the data series.
             */
            drawLines: function(context) {
                // Factor by which to scale all values to convert them to a number from
                // 0 to height - 1.
                var scale = 0;
                var bottom = this.height_ - 1;
                if (this.max_)
                    scale = bottom / this.max_;

                // Draw in reverse order, so earlier data series are drawn on top of
                // subsequent ones.
                for (var i = this.dataSeries_.length - 1; i >= 0; --i) {
                    var values = this.getValues(this.dataSeries_[i]);
                    if (!values)
                        continue;
                    context.strokeStyle = this.dataSeries_[i].getColor();
                    context.beginPath();
                    for (var x = 0; x < values.length; ++x) {
                        // The rounding is needed to avoid ugly 2-pixel wide anti-aliased
                        // horizontal lines.
                        context.lineTo(x, bottom - Math.round(values[x] * scale));
                    }
                    context.stroke();
                }
            },

            /**
             * Draw labels in |labels_|.
             */
            drawLabels: function(context) {
                if (this.labels_.length == 0)
                    return;
                var x;
                if (this.labelAlign_ == LabelAlign.RIGHT) {
                    x = this.width_ - LABEL_HORIZONTAL_SPACING;
                } else {
                    // Find the width of the widest label.
                    var maxTextWidth = 0;
                    for (var i = 0; i < this.labels_.length; ++i) {
                        var textWidth = context.measureText(this.labels_[i]).width;
                        if (maxTextWidth < textWidth)
                            maxTextWidth = textWidth;
                    }
                    x = maxTextWidth + LABEL_HORIZONTAL_SPACING;
                }

                // Set up the context.
                context.fillStyle = TEXT_COLOR;
                context.textAlign = 'right';

                // Draw top label, which is the only one that appears below its tick
                // mark.
                context.textBaseline = 'top';
                context.fillText(this.labels_[0], x, 0);

                // Draw all the other labels.
                context.textBaseline = 'bottom';
                var step = (this.height_ - 1) / (this.labels_.length - 1);
                for (var i = 1; i < this.labels_.length; ++i)
                    context.fillText(this.labels_[i], x, step * i);
            }
        };

        return Graph;
    })();

    return TimelineGraphView;
})();

// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * TimelineView displays a zoomable and scrollable graph of a number of values
 * over time.  The TimelineView class itself is responsible primarily for
 * updating the TimelineDataSeries its GraphView displays.
 */
var TimelineView = (function() {
    'use strict';

    // We inherit from HorizontalSplitView.
    var superClass = HorizontalSplitView;

    /**
     * @constructor
     */
    function TimelineView() {
        assertFirstConstructorCall(TimelineView);

        this.graphView_ = new TimelineGraphView(
            TimelineView.GRAPH_DIV_ID, TimelineView.GRAPH_CANVAS_ID,
            TimelineView.SCROLLBAR_DIV_ID, TimelineView.SCROLLBAR_INNER_DIV_ID);

        // Call superclass's constructor.

        var selectionView = new DivView(TimelineView.SELECTION_DIV_ID);
        superClass.call(this, selectionView, this.graphView_);

        this.selectionDivFullWidth_ = selectionView.getWidth();
        $(TimelineView.SELECTION_TOGGLE_ID).onclick =
            this.toggleSelectionDiv_.bind(this);

        // Interval id returned by window.setInterval for update timer.
        this.updateIntervalId_ = null;

        // List of DataSeries.  These are shared with the TimelineGraphView.  The
        // TimelineView updates their state, the TimelineGraphView reads their
        // state and draws them.
        this.dataSeries_ = [];

        // DataSeries depend on some of the global constants, so they're only
        // created once constants have been received.  We also use this message to
        // recreate DataSeries when log files are being loaded.
        g_browser.addConstantsObserver(this);

        // We observe new log entries to determine the range of the graph, and pass
        // them on to each DataSource.  We initialize the graph range to initially
        // include all events, but after that, we only update it to be the current
        // time on a timer.
        EventsTracker.getInstance().addLogEntryObserver(this);
        this.graphRangeInitialized_ = false;
    }

    TimelineView.TAB_ID = 'tab-handle-timeline';
    TimelineView.TAB_NAME = 'Timeline';
    TimelineView.TAB_HASH = '#timeline';

    // IDs for special HTML elements in timeline_view.html
    TimelineView.GRAPH_DIV_ID = 'timeline-view-graph-div';
    TimelineView.GRAPH_CANVAS_ID = 'timeline-view-graph-canvas';
    TimelineView.SELECTION_DIV_ID = 'timeline-view-selection-div';
    TimelineView.SELECTION_TOGGLE_ID = 'timeline-view-selection-toggle';
    TimelineView.SELECTION_UL_ID = 'timeline-view-selection-ul';
    TimelineView.SCROLLBAR_DIV_ID = 'timeline-view-scrollbar-div';
    TimelineView.SCROLLBAR_INNER_DIV_ID = 'timeline-view-scrollbar-inner-div';

    TimelineView.OPEN_SOCKETS_ID = 'timeline-view-open-sockets';
    TimelineView.IN_USE_SOCKETS_ID = 'timeline-view-in-use-sockets';
    TimelineView.URL_REQUESTS_ID = 'timeline-view-url-requests';
    TimelineView.DNS_JOBS_ID = 'timeline-view-dns-jobs';
    TimelineView.BYTES_RECEIVED_ID = 'timeline-view-bytes-received';
    TimelineView.BYTES_SENT_ID = 'timeline-view-bytes-sent';
    TimelineView.DISK_CACHE_BYTES_READ_ID = 'timeline-view-disk-cache-bytes-read';
    TimelineView.DISK_CACHE_BYTES_WRITTEN_ID =
        'timeline-view-disk-cache-bytes-written';

    // Class used for hiding the colored squares next to the labels for the
    // lines.
    TimelineView.HIDDEN_CLASS = 'timeline-view-hidden';

    cr.addSingletonGetter(TimelineView);

    // Frequency with which we increase update the end date to be the current
    // time, when actively capturing events.
    var UPDATE_INTERVAL_MS = 2000;

    TimelineView.prototype = {
        // Inherit the superclass's methods.
        __proto__: superClass.prototype,

        setGeometry: function(left, top, width, height) {
            superClass.prototype.setGeometry.call(this, left, top, width, height);
        },

        show: function(isVisible) {
            superClass.prototype.show.call(this, isVisible);
            // If we're hidden or not capturing events, we don't want to update the
            // graph's range.
            if (!isVisible || g_browser.isDisabled()) {
                this.setUpdateEndDateInterval_(0);
                return;
            }

            // Otherwise, update the visible range on a timer.
            this.setUpdateEndDateInterval_(UPDATE_INTERVAL_MS);
            this.updateEndDate_();
        },

        /**
         * Starts calling the GraphView's updateEndDate function every |intervalMs|
         * milliseconds.  If |intervalMs| is 0, stops calling the function.
         */
        setUpdateEndDateInterval_: function(intervalMs) {
            if (this.updateIntervalId_ !== null) {
                window.clearInterval(this.updateIntervalId_);
                this.updateIntervalId_ = null;
            }
            if (intervalMs > 0) {
                this.updateIntervalId_ =
                    window.setInterval(this.updateEndDate_.bind(this), intervalMs);
            }
        },

        /**
         * Updates the end date of graph to be the current time, unless the
         * BrowserBridge is disabled.
         */
        updateEndDate_: function() {
            // If we loaded a log file or capturing data was stopped, stop the timer.
            if (g_browser.isDisabled()) {
                this.setUpdateEndDateInterval_(0);
                return;
            }
            this.graphView_.updateEndDate();
        },

        onLoadLogFinish: function(data) {
            this.setUpdateEndDateInterval_(0);
            return true;
        },

        /**
         * Updates the visibility state of |dataSeries| to correspond to the
         * current checked state of |checkBox|.  Also updates the class of
         * |listItem| based on the new visibility state.
         */
        updateDataSeriesVisibility_: function(dataSeries, listItem, checkBox) {
            dataSeries.show(checkBox.checked);
            if (checkBox.checked)
                listItem.classList.remove(TimelineView.HIDDEN_CLASS);
            else
                listItem.classList.add(TimelineView.HIDDEN_CLASS);
        },

        dataSeriesClicked_: function(dataSeries, listItem, checkBox) {
            this.updateDataSeriesVisibility_(dataSeries, listItem, checkBox);
            this.graphView_.repaint();
        },

        /**
         * Adds the specified DataSeries to |dataSeries_|, and hooks up
         * |listItemId|'s checkbox and color to correspond to the current state
         * of the given DataSeries.
         */
        addDataSeries_: function(dataSeries, listItemId) {
            this.dataSeries_.push(dataSeries);
            var listItem = $(listItemId);
            var checkBox = $(listItemId).querySelector('input');

            // Make sure |listItem| is visible, and then use its color for the
            // DataSource.
            listItem.classList.remove(TimelineView.HIDDEN_CLASS);
            dataSeries.setColor(getComputedStyle(listItem).color);

            this.updateDataSeriesVisibility_(dataSeries, listItem, checkBox);
            checkBox.onclick =
                this.dataSeriesClicked_.bind(this, dataSeries, listItem, checkBox);
        },

        /**
         * Recreate all DataSeries.  Global constants must have been set before
         * this is called.
         */
        createDataSeries_: function() {
            this.graphRangeInitialized_ = false;
            this.dataSeries_ = [];

            this.addDataSeries_(
                new SourceCountDataSeries(
                    EventSourceType.SOCKET, EventType.SOCKET_ALIVE),
                TimelineView.OPEN_SOCKETS_ID);

            this.addDataSeries_(
                new SocketsInUseDataSeries(), TimelineView.IN_USE_SOCKETS_ID);

            this.addDataSeries_(
                new SourceCountDataSeries(
                    EventSourceType.URL_REQUEST, EventType.REQUEST_ALIVE),
                TimelineView.URL_REQUESTS_ID);

            this.addDataSeries_(
                new SourceCountDataSeries(
                    EventSourceType.HOST_RESOLVER_IMPL_JOB,
                    EventType.HOST_RESOLVER_IMPL_JOB),
                TimelineView.DNS_JOBS_ID);

            this.addDataSeries_(
                new NetworkTransferRateDataSeries(
                    EventType.SOCKET_BYTES_RECEIVED, EventType.UDP_BYTES_RECEIVED),
                TimelineView.BYTES_RECEIVED_ID);

            this.addDataSeries_(
                new NetworkTransferRateDataSeries(
                    EventType.SOCKET_BYTES_SENT, EventType.UDP_BYTES_SENT),
                TimelineView.BYTES_SENT_ID);

            this.addDataSeries_(
                new DiskCacheTransferRateDataSeries(EventType.ENTRY_READ_DATA),
                TimelineView.DISK_CACHE_BYTES_READ_ID);

            this.addDataSeries_(
                new DiskCacheTransferRateDataSeries(EventType.ENTRY_WRITE_DATA),
                TimelineView.DISK_CACHE_BYTES_WRITTEN_ID);

            this.graphView_.setDataSeries(this.dataSeries_);
        },

        /**
         * When we receive the constants, create or recreate the DataSeries.
         */
        onReceivedConstants: function(constants) {
            this.createDataSeries_();
        },

        /**
         * When all log entries are deleted, recreate the DataSeries.
         */
        onAllLogEntriesDeleted: function() {
            this.graphRangeInitialized_ = false;
            this.createDataSeries_();
        },

        onReceivedLogEntries: function(entries) {
            // Pass each entry to every DataSeries, one at a time.  Not having each
            // data series get data directly from the EventsTracker saves us from
            // having very un-Javascript-like destructors for when we load new,
            // constants and slightly simplifies DataSeries objects.
            for (var entry = 0; entry < entries.length; ++entry) {
                for (var i = 0; i < this.dataSeries_.length; ++i)
                    this.dataSeries_[i].onReceivedLogEntry(entries[entry]);
            }

            // If this is the first non-empty set of entries we've received, or we're
            // viewing a loaded log file, we will need to update the date range.
            if (this.graphRangeInitialized_ && !MainView.isViewingLoadedLog())
                return;
            if (entries.length == 0)
                return;

            // Update the date range.
            var startDate;
            if (!this.graphRangeInitialized_) {
                startDate = timeutil.convertTimeTicksToDate(entries[0].time);
            } else {
                startDate = this.graphView_.getStartDate();
            }
            var endDate =
                timeutil.convertTimeTicksToDate(entries[entries.length - 1].time);
            this.graphView_.setDateRange(startDate, endDate);
            this.graphRangeInitialized_ = true;
        },

        toggleSelectionDiv_: function() {
            var toggle = $(TimelineView.SELECTION_TOGGLE_ID);
            var shouldCollapse = toggle.className == 'timeline-view-rotateleft';

            setNodeDisplay($(TimelineView.SELECTION_UL_ID), !shouldCollapse);
            toggle.className = shouldCollapse ? 'timeline-view-rotateright' :
                'timeline-view-rotateleft';

            // Figure out the appropriate width for the selection div.
            var newWidth;
            if (shouldCollapse) {
                newWidth = toggle.offsetWidth;
            } else {
                newWidth = this.selectionDivFullWidth_;
            }

            // Change the width on the selection view (doesn't matter what we
            // set the other values to, since we will re-layout in the next line).
            this.leftView_.setGeometry(0, 0, newWidth, 100);

            // Force a re-layout now that the left view has changed width.
            this.setGeometry(
                this.getLeft(), this.getTop(), this.getWidth(), this.getHeight());
        }
    };

    return TimelineView;
})();

// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// TODO(eroman): put these methods into a namespace.

var createLogEntryTablePrinter;
var proxySettingsToString;

// Start of anonymous namespace.
(function() {
    'use strict';

    function canCollapseBeginWithEnd(beginEntry) {
        return beginEntry && beginEntry.isBegin() && beginEntry.end &&
            beginEntry.end.index == beginEntry.index + 1 &&
            (!beginEntry.orig.params || !beginEntry.end.orig.params);
    }

    /**
     * Creates a TablePrinter for use by the above two functions.  baseTime is
     * the time relative to which other times are displayed.
     */
    createLogEntryTablePrinter = function(logEntries, baseTime, logCreationTime) {
        var entries = LogGroupEntry.createArrayFrom(logEntries);
        var tablePrinter = new TablePrinter();
        var parameterOutputter = new ParameterOutputter(tablePrinter);

        if (entries.length == 0)
            return tablePrinter;

        var startTime = timeutil.convertTimeTicksToTime(entries[0].orig.time);

        for (var i = 0; i < entries.length; ++i) {
            var entry = entries[i];

            // Avoid printing the END for a BEGIN that was immediately before, unless
            // both have extra parameters.
            if (!entry.isEnd() || !canCollapseBeginWithEnd(entry.begin)) {
                var entryTime = timeutil.convertTimeTicksToTime(entry.orig.time);
                addRowWithTime(tablePrinter, entryTime - baseTime, startTime - baseTime);

                for (var j = entry.getDepth(); j > 0; --j)
                    tablePrinter.addCell('  ');

                var eventText = getTextForEvent(entry);
                // Get the elapsed time, and append it to the event text.
                if (entry.isBegin()) {
                    var dt = '?';
                    // Definite time.
                    if (entry.end) {
                        dt = entry.end.orig.time - entry.orig.time;
                    } else if (logCreationTime != undefined) {
                        dt = (logCreationTime - entryTime) + '+';
                    }
                    eventText += '  [dt=' + dt + ']';
                }

                var mainCell = tablePrinter.addCell(eventText);
                mainCell.allowOverflow = true;
            }

            // Output the extra parameters.
            if (typeof entry.orig.params == 'object') {
                // Those 5 skipped cells are: two for "t=", and three for "st=".
                tablePrinter.setNewRowCellIndent(5 + entry.getDepth());
                writeParameters(entry.orig, parameterOutputter);

                tablePrinter.setNewRowCellIndent(0);
            }
        }

        // If viewing a saved log file, add row with just the time the log was
        // created, if the event never completed.
        var lastEntry = entries[entries.length - 1];
        // If the last entry has a non-zero depth or is a begin event, the source is
        // still active.
        var isSourceActive = lastEntry.getDepth() != 0 || lastEntry.isBegin();
        if (logCreationTime != undefined && isSourceActive) {
            addRowWithTime(
                tablePrinter, logCreationTime - baseTime, startTime - baseTime);
        }

        return tablePrinter;
    };

    /**
     * Adds a new row to the given TablePrinter, and adds five cells containing
     * information about the time an event occured.
     * Format is '[t=<time of the event in ms>] [st=<ms since the source
     * started>]'.
     * @param {TablePrinter} tablePrinter The table printer to add the cells to.
     * @param {number} eventTime The time the event occured, in milliseconds,
     *     relative to some base time.
     * @param {number} startTime The time the first event for the source occured,
     *     relative to the same base time as eventTime.
     */
    function addRowWithTime(tablePrinter, eventTime, startTime) {
        tablePrinter.addRow();
        tablePrinter.addCell('t=');
        var tCell = tablePrinter.addCell(eventTime);
        tCell.alignRight = true;
        tablePrinter.addCell(' [st=');
        var stCell = tablePrinter.addCell(eventTime - startTime);
        stCell.alignRight = true;
        tablePrinter.addCell('] ');
    }

    /**
     * |hexString| must be a string of hexadecimal characters with no whitespace,
     * whose length is a multiple of two.  Writes multiple lines to |out| with
     * the hexadecimal characters from |hexString| on the left, in groups of
     * two, and their corresponding ASCII characters on the right.
     *
     * 16 bytes will be placed on each line of the output string, split into two
     * columns of 8.
     */
    function writeHexString(hexString, out) {
        var asciiCharsPerLine = 16;
        // Number of transferred bytes in a line of output.  Length of a
        // line is roughly 4 times larger.
        var hexCharsPerLine = 2 * asciiCharsPerLine;
        for (var i = 0; i < hexString.length; i += hexCharsPerLine) {
            var hexLine = '';
            var asciiLine = '';
            for (var j = i; j < i + hexCharsPerLine && j < hexString.length; j += 2) {
                // Split into two columns of 8 bytes each.
                if (j == i + hexCharsPerLine / 2)
                    hexLine += ' ';
                var hex = hexString.substr(j, 2);
                hexLine += hex + ' ';
                var charCode = parseInt(hex, 16);
                // For ASCII codes 32 though 126, display the corresponding
                // characters.  Use a space for nulls, and a period for
                // everything else.
                if (charCode >= 0x20 && charCode <= 0x7E) {
                    asciiLine += String.fromCharCode(charCode);
                } else if (charCode == 0x00) {
                    asciiLine += ' ';
                } else {
                    asciiLine += '.';
                }
            }

            // Make the ASCII text for the last line of output align with the previous
            // lines.
            hexLine +=
                makeRepeatedString(' ', 3 * asciiCharsPerLine + 1 - hexLine.length);
            out.writeLine('   ' + hexLine + '  ' + asciiLine);
        }
    }

    /**
     * Wrapper around a TablePrinter to simplify outputting lines of text for
     * event
     * parameters.
     */
    var ParameterOutputter = (function() {
        /**
         * @constructor
         */
        function ParameterOutputter(tablePrinter) {
            this.tablePrinter_ = tablePrinter;
        }

        ParameterOutputter.prototype = {
            /**
             * Outputs a single line.
             */
            writeLine: function(line) {
                this.tablePrinter_.addRow();
                var cell = this.tablePrinter_.addCell(line);
                cell.allowOverflow = true;
                return cell;
            },

            /**
             * Outputs a key=value line which looks like:
             *
             *   --> key = value
             */
            writeArrowKeyValue: function(key, value, link) {
                var cell = this.writeLine(kArrow + key + ' = ' + value);
                cell.link = link;
            },

            /**
             * Outputs a key= line which looks like:
             *
             *   --> key =
             */
            writeArrowKey: function(key) {
                this.writeLine(kArrow + key + ' =');
            },

            /**
             * Outputs multiple lines, each indented by numSpaces.
             * For instance if numSpaces=8 it might look like this:
             *
             *         line 1
             *         line 2
             *         line 3
             */
            writeSpaceIndentedLines: function(numSpaces, lines) {
                var prefix = makeRepeatedString(' ', numSpaces);
                for (var i = 0; i < lines.length; ++i)
                    this.writeLine(prefix + lines[i]);
            },

            /**
             * Outputs multiple lines such that the first line has
             * an arrow pointing at it, and subsequent lines
             * align with the first one. For example:
             *
             *   --> line 1
             *       line 2
             *       line 3
             */
            writeArrowIndentedLines: function(lines) {
                if (lines.length == 0)
                    return;

                this.writeLine(kArrow + lines[0]);

                for (var i = 1; i < lines.length; ++i)
                    this.writeLine(kArrowIndentation + lines[i]);
            }
        };

        var kArrow = ' --> ';
        var kArrowIndentation = '     ';

        return ParameterOutputter;
    })();  // end of ParameterOutputter

    /**
     * Formats the parameters for |entry| and writes them to |out|.
     * Certain event types have custom pretty printers. Everything else will
     * default to a JSON-like format.
     */
    function writeParameters(entry, out) {
        // If headers are in an object, convert them to an array for better
        // display.
        entry = reformatHeaders(entry);

        // Use any parameter writer available for this event type.
        var paramsWriter = getParameterWriterForEventType(entry.type);
        var consumedParams = {};
        if (paramsWriter)
            paramsWriter(entry, out, consumedParams);

        // Write any un-consumed parameters.
        for (var k in entry.params) {
            if (consumedParams[k])
                continue;
            defaultWriteParameter(k, entry.params[k], out);
        }
    }

    /**
     * Finds a writer to format the parameters for events of type |eventType|.
     *
     * @return {function} The returned function "writer" can be invoked
     *                    as |writer(entry, writer, consumedParams)|. It will
     *                    output the parameters of |entry| to |out|, and fill
     *                    |consumedParams| with the keys of the parameters
     *                    consumed. If no writer is available for |eventType| then
     *                    returns null.
     */
    function getParameterWriterForEventType(eventType) {
        switch (eventType) {
            case EventType.HTTP_TRANSACTION_SEND_REQUEST_HEADERS:
            case EventType.HTTP_TRANSACTION_SEND_TUNNEL_HEADERS:
            case EventType.TYPE_HTTP_CACHE_CALLER_REQUEST_HEADERS:
                return writeParamsForRequestHeaders;

            case EventType.PROXY_CONFIG_CHANGED:
                return writeParamsForProxyConfigChanged;

            case EventType.CERT_VERIFIER_JOB:
            case EventType.SSL_CERTIFICATES_RECEIVED:
                return writeParamsForCertificates;
            case EventType.CERT_CT_COMPLIANCE_CHECKED:
            case EventType.EV_CERT_CT_COMPLIANCE_CHECKED:
                return writeParamsForCheckedCertificates;
        }
        return null;
    }

    /**
     * Default parameter writer that outputs a visualization of field named |key|
     * with value |value| to |out|.
     */
    function defaultWriteParameter(key, value, out) {
        if (key == 'headers' && value instanceof Array) {
            out.writeArrowIndentedLines(value);
            return;
        }

        // For transferred bytes, display the bytes in hex and ASCII.
        if (key == 'hex_encoded_bytes' && typeof value == 'string') {
            out.writeArrowKey(key);
            writeHexString(value, out);
            return;
        }

        // Handle source_dependency entries - add link and map source type to
        // string.
        if (key == 'source_dependency' && typeof value == 'object') {
            var link = '#events&s=' + value.id;
            var valueStr = value.id + ' (' + EventSourceTypeNames[value.type] + ')';
            out.writeArrowKeyValue(key, valueStr, link);
            return;
        }

        if (key == 'net_error' && typeof value == 'number') {
            var valueStr = value + ' (' + netErrorToString(value) + ')';
            out.writeArrowKeyValue(key, valueStr);
            return;
        }

        if (key == 'quic_error' && typeof value == 'number') {
            var valueStr = value + ' (' + quicErrorToString(value) + ')';
            out.writeArrowKeyValue(key, valueStr);
            return;
        }

        if (key == 'quic_crypto_handshake_message' && typeof value == 'string') {
            var lines = value.split('\n');
            out.writeArrowIndentedLines(lines);
            return;
        }

        if (key == 'quic_rst_stream_error' && typeof value == 'number') {
            var valueStr = value + ' (' + quicRstStreamErrorToString(value) + ')';
            out.writeArrowKeyValue(key, valueStr);
            return;
        }

        if (key == 'load_flags' && typeof value == 'number') {
            var valueStr = value + ' (' + getLoadFlagSymbolicString(value) + ')';
            out.writeArrowKeyValue(key, valueStr);
            return;
        }

        if (key == 'load_state' && typeof value == 'number') {
            var valueStr = value + ' (' + getKeyWithValue(LoadState, value) + ')';
            out.writeArrowKeyValue(key, valueStr);
            return;
        }

        // Otherwise just default to JSON formatting of the value.
        out.writeArrowKeyValue(key, JSON.stringify(value));
    }

    /**
     * Returns the set of LoadFlags that make up the integer |loadFlag|.
     * For example: getLoadFlagSymbolicString(
     */
    function getLoadFlagSymbolicString(loadFlag) {
        return getSymbolicString(
            loadFlag, LoadFlag, getKeyWithValue(LoadFlag, loadFlag));
    }

    /**
     * Returns the set of CertStatusFlags that make up the integer
     * |certStatusFlag|
     */
    function getCertStatusFlagSymbolicString(certStatusFlag) {
        return getSymbolicString(certStatusFlag, CertStatusFlag, '');
    }

    /**
     * Returns a string representing the flags composing the given bitmask.
     */
    function getSymbolicString(bitmask, valueToName, zeroName) {
        var matchingFlagNames = [];

        for (var k in valueToName) {
            if (bitmask & valueToName[k])
                matchingFlagNames.push(k);
        }

        // If no flags were matched, returns a special value.
        if (matchingFlagNames.length == 0)
            return zeroName;

        return matchingFlagNames.join(' | ');
    }

    /**
     * TODO(eroman): get rid of this, as it is only used by 1 callsite.
     *
     * Indent |lines| by |start|.
     *
     * For example, if |start| = ' -> ' and |lines| = ['line1', 'line2', 'line3']
     * the output will be:
     *
     *   " -> line1\n" +
     *   "    line2\n" +
     *   "    line3"
     */
    function indentLines(start, lines) {
        return start + lines.join('\n' + makeRepeatedString(' ', start.length));
    }

    /**
     * If entry.param.headers exists and is an object other than an array,
     * converts
     * it into an array and returns a new entry.  Otherwise, just returns the
     * original entry.
     */
    function reformatHeaders(entry) {
        // If there are no headers, or it is not an object other than an array,
        // return |entry| without modification.
        if (!entry.params || entry.params.headers === undefined ||
            typeof entry.params.headers != 'object' ||
            entry.params.headers instanceof Array) {
            return entry;
        }

        // Duplicate the top level object, and |entry.params|, so the original
        // object
        // will not be modified.
        entry = shallowCloneObject(entry);
        entry.params = shallowCloneObject(entry.params);

        // Convert headers to an array.
        var headers = [];
        for (var key in entry.params.headers)
            headers.push(key + ': ' + entry.params.headers[key]);
        entry.params.headers = headers;

        return entry;
    }

    /**
     * Outputs the request header parameters of |entry| to |out|.
     */
    function writeParamsForRequestHeaders(entry, out, consumedParams) {
        var params = entry.params;

        if (!(typeof params.line == 'string') || !(params.headers instanceof Array)) {
            // Unrecognized params.
            return;
        }

        // Strip the trailing CRLF that params.line contains.
        var lineWithoutCRLF = params.line.replace(/\r\n$/g, '');
        out.writeArrowIndentedLines([lineWithoutCRLF].concat(params.headers));

        consumedParams.line = true;
        consumedParams.headers = true;
    }

    function writeCertificateParam(
        certs_container, out, consumedParams, paramName) {
        if (certs_container.certificates instanceof Array) {
            var certs =
                certs_container.certificates.reduce(function(previous, current) {
                    return previous.concat(current.split('\n'));
                }, new Array());
            out.writeArrowKey(paramName);
            out.writeSpaceIndentedLines(8, certs);
            consumedParams[paramName] = true;
        }
    }

    /**
     * Outputs the certificate parameters of |entry| to |out|.
     */
    function writeParamsForCertificates(entry, out, consumedParams) {
        writeCertificateParam(entry.params, out, consumedParams, 'certificates');

        if (typeof(entry.params.verified_cert) == 'object')
            writeCertificateParam(
                entry.params.verified_cert, out, consumedParams, 'verified_cert');

        if (typeof(entry.params.cert_status) == 'number') {
            var valueStr = entry.params.cert_status + ' (' +
                getCertStatusFlagSymbolicString(entry.params.cert_status) + ')';
            out.writeArrowKeyValue('cert_status', valueStr);
            consumedParams.cert_status = true;
        }
    }

    function writeParamsForCheckedCertificates(entry, out, consumedParams) {
        if (typeof(entry.params.certificate) == 'object')
            writeCertificateParam(
                entry.params.certificate, out, consumedParams, 'certificate');
    }

    function writeParamsForProxyConfigChanged(entry, out, consumedParams) {
        var params = entry.params;

        if (typeof params.new_config != 'object') {
            // Unrecognized params.
            return;
        }

        if (typeof params.old_config == 'object') {
            var oldConfigString = proxySettingsToString(params.old_config);
            // The previous configuration may not be present in the case of
            // the initial proxy settings fetch.
            out.writeArrowKey('old_config');

            out.writeSpaceIndentedLines(8, oldConfigString.split('\n'));

            consumedParams.old_config = true;
        }

        var newConfigString = proxySettingsToString(params.new_config);
        out.writeArrowKey('new_config');
        out.writeSpaceIndentedLines(8, newConfigString.split('\n'));

        consumedParams.new_config = true;
    }

    function getTextForEvent(entry) {
        var text = '';

        if (entry.isBegin() && canCollapseBeginWithEnd(entry)) {
            // Don't prefix with '+' if we are going to collapse the END event.
            text = ' ';
        } else if (entry.isBegin()) {
            text = '+' + text;
        } else if (entry.isEnd()) {
            text = '-' + text;
        } else {
            text = ' ';
        }

        text += EventTypeNames[entry.orig.type];
        return text;
    }

    proxySettingsToString = function(config) {
        if (!config)
            return '';

        // TODO(eroman): if |config| has unexpected properties, print it as JSON
        //               rather than hide them.

        function getProxyListString(proxies) {
            // Older versions of Chrome would set these values as strings, whereas
            // newer
            // logs use arrays.
            // TODO(eroman): This behavior changed in M27. Support for older logs can
            //               safely be removed circa M29.
            if (Array.isArray(proxies)) {
                var listString = proxies.join(', ');
                if (proxies.length > 1)
                    return '[' + listString + ']';
                return listString;
            }
            return proxies;
        }

        // The proxy settings specify up to three major fallback choices
        // (auto-detect, custom pac url, or manual settings).
        // We enumerate these to a list so we can later number them.
        var modes = [];

        // Output any automatic settings.
        if (config.auto_detect)
            modes.push(['Auto-detect']);
        if (config.pac_url)
            modes.push(['PAC script: ' + config.pac_url]);

        // Output any manual settings.
        if (config.single_proxy || config.proxy_per_scheme) {
            var lines = [];

            if (config.single_proxy) {
                lines.push('Proxy server: ' + getProxyListString(config.single_proxy));
            } else if (config.proxy_per_scheme) {
                for (var urlScheme in config.proxy_per_scheme) {
                    if (urlScheme != 'fallback') {
                        lines.push(
                            'Proxy server for ' + urlScheme.toUpperCase() + ': ' +
                            getProxyListString(config.proxy_per_scheme[urlScheme]));
                    }
                }
                if (config.proxy_per_scheme.fallback) {
                    lines.push(
                        'Proxy server for everything else: ' +
                        getProxyListString(config.proxy_per_scheme.fallback));
                }
            }

            // Output any proxy bypass rules.
            if (config.bypass_list) {
                if (config.reverse_bypass) {
                    lines.push('Reversed bypass list: ');
                } else {
                    lines.push('Bypass list: ');
                }

                for (var i = 0; i < config.bypass_list.length; ++i)
                    lines.push('  ' + config.bypass_list[i]);
            }

            modes.push(lines);
        }

        var result = [];
        if (modes.length < 1) {
            // If we didn't find any proxy settings modes, we are using DIRECT.
            result.push('Use DIRECT connections.');
        } else if (modes.length == 1) {
            // If there was just one mode, don't bother numbering it.
            result.push(modes[0].join('\n'));
        } else {
            // Otherwise concatenate all of the modes into a numbered list
            // (which correspond with the fallback order).
            for (var i = 0; i < modes.length; ++i)
                result.push(indentLines('(' + (i + 1) + ') ', modes[i]));
        }

        if (config.source != undefined && config.source != 'UNKNOWN')
            result.push('Source: ' + config.source);

        return result.join('\n');
    };

// End of anonymous namespace.
})();

// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview
 * LogGroupEntry is a wrapper around log entries, which makes it easier to
 * find the corresponding start/end of events.
 *
 * This is used internally by the log and timeline views to pretty print
 * collections of log entries.
 */

// TODO(eroman): document these methods!

var LogGroupEntry = (function() {
    'use strict';

    function LogGroupEntry(origEntry, index) {
        this.orig = origEntry;
        this.index = index;
    }

    LogGroupEntry.prototype = {
        isBegin: function() {
            return this.orig.phase == EventPhase.PHASE_BEGIN;
        },

        isEnd: function() {
            return this.orig.phase == EventPhase.PHASE_END;
        },

        getDepth: function() {
            var depth = 0;
            var p = this.parentEntry;
            while (p) {
                depth += 1;
                p = p.parentEntry;
            }
            return depth;
        }
    };

    function findParentIndex(parentStack, eventType) {
        for (var i = parentStack.length - 1; i >= 0; --i) {
            if (parentStack[i].orig.type == eventType)
                return i;
        }
        return -1;
    }

    /**
     * Returns a list of LogGroupEntrys. This basically wraps the original log
     * entry, but makes it easier to find the start/end of the event.
     */
    LogGroupEntry.createArrayFrom = function(origEntries) {
        var groupedEntries = [];

        // Stack of enclosing PHASE_BEGIN elements.
        var parentStack = [];

        for (var i = 0; i < origEntries.length; ++i) {
            var origEntry = origEntries[i];

            var groupEntry = new LogGroupEntry(origEntry, i);
            groupedEntries.push(groupEntry);

            // If this is the end of an event, match it to the start.
            if (groupEntry.isEnd()) {
                // Walk up the parent stack to find the corresponding BEGIN for this
                // END.
                var parentIndex = findParentIndex(parentStack, groupEntry.orig.type);

                if (parentIndex == -1) {
                    // Unmatched end.
                } else {
                    groupEntry.begin = parentStack[parentIndex];

                    // Consider this as the terminator for all open BEGINs up until
                    // parentIndex.
                    while (parentIndex < parentStack.length) {
                        var p = parentStack.pop();
                        p.end = groupEntry;
                    }
                }
            }

            // Inherit the current parent.
            if (parentStack.length > 0)
                groupEntry.parentEntry = parentStack[parentStack.length - 1];

            if (groupEntry.isBegin())
                parentStack.push(groupEntry);
        }

        return groupedEntries;
    };

    return LogGroupEntry;
})();

// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * This view displays information on the proxy setup:
 *
 *   - Shows the current proxy settings.
 *   - Has a button to reload these settings.
 *   - Shows the list of proxy hostnames that are cached as "bad".
 *   - Has a button to clear the cached bad proxies.
 */
var ProxyView = (function() {
    'use strict';

    // We inherit from DivView.
    var superClass = DivView;

    /**
     * @constructor
     */
    function ProxyView() {
        assertFirstConstructorCall(ProxyView);

        // Call superclass's constructor.
        superClass.call(this, ProxyView.MAIN_BOX_ID);

        // Hook up the UI components.
        $(ProxyView.RELOAD_SETTINGS_BUTTON_ID).onclick =
            g_browser.sendReloadProxySettings.bind(g_browser);
        $(ProxyView.CLEAR_BAD_PROXIES_BUTTON_ID).onclick =
            g_browser.sendClearBadProxies.bind(g_browser);

        // Register to receive proxy information as it changes.
        g_browser.addProxySettingsObserver(this, true);
        g_browser.addBadProxiesObserver(this, true);
    }

    ProxyView.TAB_ID = 'tab-handle-proxy';
    ProxyView.TAB_NAME = 'Proxy';
    ProxyView.TAB_HASH = '#proxy';

    // IDs for special HTML elements in proxy_view.html
    ProxyView.MAIN_BOX_ID = 'proxy-view-tab-content';
    ProxyView.ORIGINAL_SETTINGS_DIV_ID = 'proxy-view-original-settings';
    ProxyView.EFFECTIVE_SETTINGS_DIV_ID = 'proxy-view-effective-settings';
    ProxyView.ORIGINAL_CONTENT_DIV_ID = 'proxy-view-original-content';
    ProxyView.EFFECTIVE_CONTENT_DIV_ID = 'proxy-view-effective-content';
    ProxyView.RELOAD_SETTINGS_BUTTON_ID = 'proxy-view-reload-settings';
    ProxyView.BAD_PROXIES_DIV_ID = 'proxy-view-bad-proxies-div';
    ProxyView.BAD_PROXIES_TBODY_ID = 'proxy-view-bad-proxies-tbody';
    ProxyView.CLEAR_BAD_PROXIES_BUTTON_ID = 'proxy-view-clear-bad-proxies';
    ProxyView.SOCKS_HINTS_DIV_ID = 'proxy-view-socks-hints';
    ProxyView.SOCKS_HINTS_FLAG_DIV_ID = 'proxy-view-socks-hints-flag';

    cr.addSingletonGetter(ProxyView);

    ProxyView.prototype = {
        // Inherit the superclass's methods.
        __proto__: superClass.prototype,

        onLoadLogFinish: function(data) {
            return this.onProxySettingsChanged(data.proxySettings) &&
                this.onBadProxiesChanged(data.badProxies);
        },

        onProxySettingsChanged: function(proxySettings) {
            $(ProxyView.ORIGINAL_SETTINGS_DIV_ID).innerHTML = '';
            $(ProxyView.EFFECTIVE_SETTINGS_DIV_ID).innerHTML = '';
            this.updateSocksHints_(null);

            if (!proxySettings)
                return false;

            // Both |original| and |effective| are dictionaries describing the
            // settings.
            var original = proxySettings.original;
            var effective = proxySettings.effective;

            var originalStr = proxySettingsToString(original);
            var effectiveStr = proxySettingsToString(effective);

            setNodeDisplay(
                $(ProxyView.ORIGINAL_CONTENT_DIV_ID), originalStr != effectiveStr);

            $(ProxyView.ORIGINAL_SETTINGS_DIV_ID).innerText = originalStr;
            $(ProxyView.EFFECTIVE_SETTINGS_DIV_ID).innerText = effectiveStr;

            this.updateSocksHints_(effective);

            return true;
        },

        onBadProxiesChanged: function(badProxies) {
            $(ProxyView.BAD_PROXIES_TBODY_ID).innerHTML = '';
            setNodeDisplay(
                $(ProxyView.BAD_PROXIES_DIV_ID), badProxies && badProxies.length > 0);

            if (!badProxies)
                return false;

            // Add a table row for each bad proxy entry.
            for (var i = 0; i < badProxies.length; ++i) {
                var entry = badProxies[i];
                var badUntilDate = timeutil.convertTimeTicksToDate(entry.bad_until);

                var tr = addNode($(ProxyView.BAD_PROXIES_TBODY_ID), 'tr');

                var nameCell = addNode(tr, 'td');
                var badUntilCell = addNode(tr, 'td');

                addTextNode(nameCell, entry.proxy_uri);
                timeutil.addNodeWithDate(badUntilCell, badUntilDate);
            }
            return true;
        },

        updateSocksHints_: function(proxySettings) {
            setNodeDisplay($(ProxyView.SOCKS_HINTS_DIV_ID), false);

            if (!proxySettings)
                return;

            var socksProxy = getSingleSocks5Proxy_(proxySettings.single_proxy);
            if (!socksProxy)
                return;

            // Suggest a recommended --host-resolver-rules.
            // NOTE: This does not compensate for any proxy bypass rules. If the
            // proxy settings include proxy bypasses the user may need to expand the
            // exclusions for host resolving.
            var hostResolverRules = 'MAP * ~NOTFOUND , EXCLUDE ' + socksProxy.host;
            var hostResolverRulesFlag =
                '--host-resolver-rules="' + hostResolverRules + '"';

            // TODO(eroman): On Linux the ClientInfo.command_line is wrong in that it
            // doesn't include any quotes around the parameters. This means the
            // string search above is going to fail :(
            if (ClientInfo.command_line &&
                ClientInfo.command_line.indexOf(hostResolverRulesFlag) != -1) {
                // Chrome is already using the suggested resolver rules.
                return;
            }

            $(ProxyView.SOCKS_HINTS_FLAG_DIV_ID).innerText = hostResolverRulesFlag;
            setNodeDisplay($(ProxyView.SOCKS_HINTS_DIV_ID), true);
        }
    };

    function getSingleSocks5Proxy_(proxyList) {
        var proxyString;
        if (typeof proxyList == 'string') {
            // Older versions of Chrome passed single_proxy as a string.
            // TODO(eroman): This behavior changed in M27. Support for older logs can
            //               safely be removed circa M29.
            proxyString = proxyList;
        } else if (Array.isArray(proxyList) && proxyList.length == 1) {
            proxyString = proxyList[0];
        } else {
            return null;
        }

        var pattern = /^socks5:\/\/(.*)$/;
        var matches = pattern.exec(proxyString);

        if (!matches)
            return null;

        var hostPortString = matches[1];

        matches = /^(.*):(\d+)$/.exec(hostPortString);
        if (!matches)
            return null;

        var result = {host: matches[1], port: matches[2]};

        // Strip brackets off of IPv6 literals.
        matches = /^\[(.*)\]$/.exec(result.host);
        if (matches)
            result.host = matches[1];

        return result;
    }

    return ProxyView;
})();

// // Copyright (c) 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * This view displays a summary of the state of each QUIC session, and
 * has links to display them in the events tab.
 */
var QuicView = (function() {
    'use strict';

    // We inherit from DivView.
    var superClass = DivView;

    /**
     * @constructor
     */
    function QuicView() {
        assertFirstConstructorCall(QuicView);

        // Call superclass's constructor.
        superClass.call(this, QuicView.MAIN_BOX_ID);

        g_browser.addQuicInfoObserver(this, true);
    }

    QuicView.TAB_ID = 'tab-handle-quic';
    QuicView.TAB_NAME = 'QUIC';
    QuicView.TAB_HASH = '#quic';

    // IDs for special HTML elements in quic_view.html
    QuicView.MAIN_BOX_ID = 'quic-view-tab-content';

    cr.addSingletonGetter(QuicView);

    QuicView.prototype = {
        // Inherit the superclass's methods.
        __proto__: superClass.prototype,

        onLoadLogFinish: function(data) {
            return this.onQuicInfoChanged(data.quicInfo);
        },

        /**
         * If there are any sessions, display a single table with
         * information on each QUIC session.  Otherwise, displays "None".
         */
        onQuicInfoChanged: function(quicInfo) {
            if (!quicInfo)
                return false;
            var input = new JsEvalContext(quicInfo);
            jstProcess(input, $(QuicView.MAIN_BOX_ID));
            return true;
        },
    };

    return QuicView;
})();

// // Copyright (c) 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * This view displays a summary of the current Reporting cache, including the
 * configuration headers received for Reporting-enabled origins, and any queued
 * reports that are waiting to be uploaded.
 */
var ReportingView = (function() {
    'use strict';

    // We inherit from DivView.
    var superClass = DivView;

    /**
     * @constructor
     */
    function ReportingView() {
        assertFirstConstructorCall(ReportingView);

        // Call superclass's constructor.
        superClass.call(this, ReportingView.MAIN_BOX_ID);

        g_browser.addReportingInfoObserver(this, true);
    }

    ReportingView.TAB_ID = 'tab-handle-reporting';
    ReportingView.TAB_NAME = 'Reporting';
    ReportingView.TAB_HASH = '#reporting';

    // IDs for special HTML elements in reporting_view.html
    ReportingView.MAIN_BOX_ID = 'reporting-view-tab-content';

    ReportingView.DISABLED_BOX_ID = 'reporting-view-disabled-content';
    ReportingView.ENABLED_BOX_ID = 'reporting-view-enabled-content';

    ReportingView.CLIENTS_EMPTY_ID = 'reporting-view-clients-empty';
    ReportingView.CLIENTS_TABLE_ID = 'reporting-view-clients-table';
    ReportingView.CLIENTS_TBODY_ID = 'reporting-view-clients-tbody';
    ReportingView.REPORTS_EMPTY_ID = 'reporting-view-reports-empty';
    ReportingView.REPORTS_TABLE_ID = 'reporting-view-reports-table';
    ReportingView.REPORTS_TBODY_ID = 'reporting-view-reports-tbody';

    ReportingView.NEL_POLICIES_DISABLED_ID =
        'reporting-view-nel-policies-disabled';
    ReportingView.NEL_POLICIES_EMPTY_ID = 'reporting-view-nel-policies-empty';
    ReportingView.NEL_POLICIES_TABLE_ID = 'reporting-view-nel-policies-table';
    ReportingView.NEL_POLICIES_TBODY_ID = 'reporting-view-nel-policies-tbody';

    cr.addSingletonGetter(ReportingView);

    ReportingView.prototype = {
        // Inherit the superclass's methods.
        __proto__: superClass.prototype,

        onLoadLogFinish: function(data) {
            return this.onReportingInfoChanged(data.reportingInfo);
        },

        onReportingInfoChanged: function(reportingInfo) {
            if (!isObject_(reportingInfo))
                return false;

            var enabled = !!reportingInfo.reportingEnabled;
            setNodeDisplay($(ReportingView.DISABLED_BOX_ID), !enabled);
            setNodeDisplay($(ReportingView.ENABLED_BOX_ID), enabled);
            if (!enabled)
                return true;

            displayReportDetail_(ensureArray_(reportingInfo.reports));
            displayClientDetail_(ensureArray_(reportingInfo.clients));
            displayNELPolicyDetail_(reportingInfo.networkErrorLogging);
            return true;
        },
    };

    /**
     * Displays information about each queued report in the Reporting cache.
     * REQUIRES: |reportList| must be an array
     */
    function displayReportDetail_(reportList) {
        // Clear the existing content.
        $(ReportingView.REPORTS_TBODY_ID).innerHTML = '';

        var empty = reportList.length == 0;
        setNodeDisplay($(ReportingView.REPORTS_EMPTY_ID), empty);
        setNodeDisplay($(ReportingView.REPORTS_TABLE_ID), !empty);
        if (empty)
            return;

        for (var i = 0; i < reportList.length; ++i) {
            var report = ensureObject_(reportList[i]);
            var tr = addNode($(ReportingView.REPORTS_TBODY_ID), 'tr');

            var queuedNode = addNode(tr, 'td');
            if (report.queued != undefined) {
                var queuedDate = timeutil.convertTimeTicksToDate(report.queued);
                timeutil.addNodeWithDate(queuedNode, queuedDate);
            }

            addNodeWithText(tr, 'td', report.url);

            var statusNode = addNode(tr, 'td');
            addTextNode(statusNode, report.status);
            addTextNode(statusNode, ' (' + report.group);
            if (report.depth !== undefined && report.depth > 0)
                addTextNode(statusNode, ', depth: ' + report.depth);
            if (report.attempts !== undefined && report.attempts > 0)
                addTextNode(statusNode, ', attempts: ' + report.attempts);
            addTextNode(statusNode, ')');

            addNodeWithText(tr, 'td', report.type);

            var contentNode = addNode(tr, 'td');
            if (report.type == 'network-error')
                displayNetworkErrorContent_(contentNode, report);
            else
                displayGenericReportContent_(contentNode, report);
        }
    }

    /**
     * Adds nodes to the "content" cell for a report that allow you to show a
     * summary as well as collapsable detail.  We will add a clickable button that
     * toggles between showing and hiding the detail; its label will be `showText`
     * when the detail is hidden, and `hideText` when it's visible.
     *
     * The result is an object containing `summary` and `detail` nodes.  You can
     * add whatever content you want to each of these nodes.  The summary should
     * be a one-liner, and will be a <span>.  The detail can be as large as you
     * want, and will be a <div>.
     */
    function addContentSections_(contentNode, showText, hideText) {
        var sections = {};

        sections.summary = addNode(contentNode, 'span');
        sections.summary.classList.add('reporting-content-summary');

        var button = addNode(contentNode, 'span');
        button.classList.add('reporting-content-expand-button');
        addTextNode(button, showText);
        button.onclick = function() {
            toggleNodeDisplay(sections.detail);
            button.textContent =
                getNodeDisplay(sections.detail) ? hideText : showText;
        };

        sections.detail = addNode(contentNode, 'div');
        sections.detail.classList.add('reporting-content-detail');
        setNodeDisplay(sections.detail, false);

        return sections;
    }

    /**
     * Displays format-specific detail for Network Error Logging reports.
     * REQUIRES: |report| must be an object
     */
    function displayNetworkErrorContent_(contentNode, report) {
        var contentSections =
            addContentSections_(contentNode, 'Show raw report', 'Hide raw report');

        var body = ensureObject_(report.body);
        addTextNode(contentSections.summary, body.type);
        // Only show the status code if it's present and not 0.
        if (body['status-code'])
            addTextNode(
                contentSections.summary, ' (' + report.body['status-code'] + ')');

        addNodeWithText(
            contentSections.detail, 'pre', JSON.stringify(report, null, '  '));
    }

    /**
     * Displays a generic content cell for reports whose type we don't know how to
     * render something specific for.
     * REQUIRES: |report| must be an object
     */
    function displayGenericReportContent_(contentNode, report) {
        var contentSections =
            addContentSections_(contentNode, 'Show raw report', 'Hide raw report');
        addNodeWithText(
            contentSections.detail, 'pre', JSON.stringify(report, null, '  '));
    }

    /**
     * Displays information about each origin that has provided Reporting headers.
     * REQUIRES: |clientList| must be an array
     */
    function displayClientDetail_(clientList) {
        // Clear the existing content.
        $(ReportingView.CLIENTS_TBODY_ID).innerHTML = '';

        var empty = clientList.length == 0;
        setNodeDisplay($(ReportingView.CLIENTS_EMPTY_ID), empty);
        setNodeDisplay($(ReportingView.CLIENTS_TABLE_ID), !empty);
        if (empty)
            return;

        for (var i = 0; i < clientList.length; ++i) {
            var client = ensureObject_(clientList[i]);
            var groups = ensureArray_(client.groups);
            if (groups.length == 0)
                continue;

            // Calculate the total number of endpoints for this origin, so that we can
            // rowspan its origin cell.
            var originHeight = 0;
            for (var j = 0; j < groups.length; ++j) {
                var group = ensureObject_(groups[j]);
                var endpoints = ensureArray_(group.endpoints);
                originHeight += group.endpoints.length;
            }
            if (originHeight == 0)
                continue;

            for (var j = 0; j < groups.length; ++j) {
                var group = ensureObject_(groups[j]);
                var endpoints = ensureArray_(group.endpoints);
                for (var k = 0; k < endpoints.length; ++k) {
                    var endpoint = ensureObject_(endpoints[k]);
                    var tr = addNode($(ReportingView.CLIENTS_TBODY_ID), 'tr');

                    if (j == 0 && k == 0) {
                        var originNode = addNode(tr, 'td');
                        originNode.setAttribute('rowspan', originHeight);
                        addTextNode(originNode, client.origin);
                    }

                    if (k == 0) {
                        var groupNode = addNode(tr, 'td');
                        groupNode.setAttribute('rowspan', group.endpoints.length);
                        addTextNode(groupNode, group.name);

                        var subdomainsNode = addNode(tr, 'td');
                        subdomainsNode.classList.add('reporting-centered');
                        subdomainsNode.setAttribute('rowspan', group.endpoints.length);
                        addTextNode(
                            subdomainsNode, !!group.includeSubdomains ? 'yes' : 'no');

                        var expiresNode = addNode(tr, 'td');
                        expiresNode.setAttribute('rowspan', group.endpoints.length);
                        if (group.expires !== undefined) {
                            var expiresDate = timeutil.convertTimeTicksToDate(group.expires);
                            timeutil.addNodeWithDate(expiresNode, expiresDate);
                            if (expired_(expiresDate)) {
                                var expiredSpan = addNode(expiresNode, 'span');
                                expiredSpan.classList.add('warning-text');
                                addTextNode(expiredSpan, ' [expired]');
                            }
                        }
                    }

                    var endpointNode = addNode(tr, 'td');
                    addTextNode(endpointNode, endpoint.url);

                    var priorityNode = addNode(tr, 'td');
                    priorityNode.classList.add('reporting-centered');
                    addTextNode(priorityNode, valueOrDefault_(endpoint.priority, 0));

                    var weightNode = addNode(tr, 'td');
                    weightNode.classList.add('reporting-centered');
                    addTextNode(weightNode, valueOrDefault_(endpoint.weight, 1));

                    addUploadCount_(tr, ensureObject_(endpoint.successful));
                    addUploadCount_(tr, ensureObject_(endpoint.failed));
                }
            }
        }
    }

    /**
     * Adds an upload count cell to the client details table.
     * REQUIRES: |counts| must be an object
     */
    function addUploadCount_(tr, counts) {
        var node = addNode(tr, 'td');
        node.classList.add('reporting-centered');
        var uploads = valueOrDefault_(counts.uploads, 0);
        var reports = valueOrDefault_(counts.reports, 0);
        if (uploads == 0 && reports == 0) {
            addTextNode(node, '-');
        } else {
            addTextNode(node, uploads + ' (' + reports + ')');
        }
    }

    /**
     * Displays information about each origin that has provided NEL headers.
     */
    function displayNELPolicyDetail_(nelInfo) {
        // Clear the existing content.
        $(ReportingView.NEL_POLICIES_TBODY_ID).innerHTML = '';

        var disabled = (nelInfo === undefined);
        setNodeDisplay($(ReportingView.NEL_POLICIES_DISABLED_ID), disabled);
        if (disabled) {
            setNodeDisplay($(ReportingView.NEL_POLICIES_EMPTY_ID), false);
            setNodeDisplay($(ReportingView.NEL_POLICIES_TABLE_ID), false);
            return;
        }

        nelInfo = ensureObject_(nelInfo);
        var policies = ensureArray_(nelInfo.originPolicies);
        var empty = policies.length == 0;
        setNodeDisplay($(ReportingView.NEL_POLICIES_EMPTY_ID), empty);
        setNodeDisplay($(ReportingView.NEL_POLICIES_TABLE_ID), !empty);
        if (empty)
            return;

        for (var i = 0; i < policies.length; ++i) {
            var policy = ensureObject_(policies[i]);
            var tr = addNode($(ReportingView.NEL_POLICIES_TBODY_ID), 'tr');

            addNodeWithText(tr, 'td', policy.origin);

            var subdomainsNode = addNode(tr, 'td');
            subdomainsNode.classList.add('reporting-centered');
            addTextNode(subdomainsNode, !!policy.includeSubdomains ? 'yes' : 'no');

            var expiresNode = addNode(tr, 'td');
            if (policy.expires !== undefined) {
                var expiresDate = timeutil.convertTimeTicksToDate(policy.expires);
                timeutil.addNodeWithDate(expiresNode, expiresDate);
                if (expired_(expiresDate)) {
                    var expiredSpan = addNode(expiresNode, 'span');
                    expiredSpan.classList.add('warning-text');
                    addTextNode(expiredSpan, ' [expired]');
                }
            }

            addNodeWithText(tr, 'td', policy.reportTo);

            var successFractionNode = addNode(tr, 'td');
            successFractionNode.classList.add('reporting-right-justified');
            addTextNode(successFractionNode, percent_(policy.successFraction));

            var failureFractionNode = addNode(tr, 'td');
            failureFractionNode.classList.add('reporting-right-justified');
            addTextNode(failureFractionNode, percent_(policy.failureFraction));
        }
    }

    /**
     * Returns whether an expiry timestamp has expired.  If we're viewing live
     * data, uses the actual current time to determine whether it's expired.  If
     * we're viewing data from a saved log file, uses the timestamp when the file
     * was recorded.
     *
     * @param {Date} expiry An expiry time
     */
    function expired_(expiry) {
        var now;
        if (MainView.isViewingLoadedLog()) {
            now = new Date(ClientInfo.numericDate);
        } else {
            now = new Date();
        }
        return expiry < now;
    }

    /**
     * Formats a float fraction as a percentage.
     */
    function percent_(fraction) {
        return (valueOrDefault_(fraction, 0) * 100).toFixed(2) + '%';
    }

    function isObject_(value) {
        return value && typeof(value) === 'object';
    }

    function isArray_(value) {
        return value !== undefined && value instanceof Array;
    }

    function ensureObject_(value) {
        if (isObject_(value))
            return value;
        return {};
    }

    function ensureArray_(value) {
        if (isArray_(value))
            return value;
        return [];
    }

    function valueOrDefault_(value, defaultValue) {
        if (value != undefined)
            return value;
        return defaultValue;
    }

    return ReportingView;
})();

// // Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var SocketPoolWrapper = (function() {
    'use strict';

    /**
     * SocketPoolWrapper is a wrapper around socket pools entries.  It's
     * used by the log and sockets view to print tables containing both
     * a synopsis of the state of all pools, and listing the groups within
     * individual pools.
     *
     * The constructor takes a socket pool and its parent, and generates a
     * unique name from the two, which is stored as |fullName|.  |parent|
     * must itself be a SocketPoolWrapper.
     *
     * @constructor
     */
    function SocketPoolWrapper(socketPool, parent) {
        this.origPool = socketPool;
        this.fullName = socketPool.name;
        if (this.fullName != socketPool.type)
            this.fullName += ' (' + socketPool.type + ')';
        if (parent)
            this.fullName = parent.fullName + '->' + this.fullName;
    }

    /**
     * Returns an array of SocketPoolWrappers created from each of the socket
     * pools in |socketPoolInfo|.  Nested socket pools appear immediately after
     * their parent, and groups of nodes from trees with root nodes with the same
     * id are placed adjacent to each other.
     */
    SocketPoolWrapper.createArrayFrom = function(socketPoolInfo) {
        // Create SocketPoolWrappers for each socket pool and separate socket pools
        // them into different arrays based on root node name.
        var socketPoolGroups = [];
        var socketPoolNameLists = {};
        for (var i = 0; i < socketPoolInfo.length; ++i) {
            var name = socketPoolInfo[i].name;
            if (!socketPoolNameLists[name]) {
                socketPoolNameLists[name] = [];
                socketPoolGroups.push(socketPoolNameLists[name]);
            }
            addSocketPoolsToList(socketPoolNameLists[name], socketPoolInfo[i], null);
        }

        // Merge the arrays.
        var socketPoolList = [];
        for (var i = 0; i < socketPoolGroups.length; ++i) {
            socketPoolList = socketPoolList.concat(socketPoolGroups[i]);
        }
        return socketPoolList;
    };

    /**
     * Recursively creates SocketPoolWrappers from |origPool| and all its
     * children and adds them all to |socketPoolList|.  |parent| is the
     * SocketPoolWrapper for the parent of |origPool|, or null, if it's
     * a top level socket pool.
     */
    function addSocketPoolsToList(socketPoolList, origPool, parent) {
        var socketPool = new SocketPoolWrapper(origPool, parent);
        socketPoolList.push(socketPool);
        if (origPool.nested_pools) {
            for (var i = 0; i < origPool.nested_pools.length; ++i) {
                addSocketPoolsToList(
                    socketPoolList, origPool.nested_pools[i], socketPool);
            }
        }
    }

    /**
     * Returns a table printer containing information on each
     * SocketPoolWrapper in |socketPools|.
     */
    SocketPoolWrapper.createTablePrinter = function(socketPools) {
        var tablePrinter = new TablePrinter();
        tablePrinter.addHeaderCell('Name');
        tablePrinter.addHeaderCell('Handed Out');
        tablePrinter.addHeaderCell('Idle');
        tablePrinter.addHeaderCell('Connecting');
        tablePrinter.addHeaderCell('Max');
        tablePrinter.addHeaderCell('Max Per Group');
        tablePrinter.addHeaderCell('Generation');

        for (var i = 0; i < socketPools.length; i++) {
            var origPool = socketPools[i].origPool;

            tablePrinter.addRow();
            tablePrinter.addCell(socketPools[i].fullName);

            tablePrinter.addCell(origPool.handed_out_socket_count);
            var idleCell = tablePrinter.addCell(origPool.idle_socket_count);
            var connectingCell =
                tablePrinter.addCell(origPool.connecting_socket_count);

            if (origPool.groups) {
                var idleSources = [];
                var connectingSources = [];
                for (var groupName in origPool.groups) {
                    var group = origPool.groups[groupName];
                    idleSources = idleSources.concat(group.idle_sockets);
                    connectingSources = connectingSources.concat(group.connect_jobs);
                }
                idleCell.link = sourceListLink(idleSources);
                connectingCell.link = sourceListLink(connectingSources);
            }

            tablePrinter.addCell(origPool.max_socket_count);
            tablePrinter.addCell(origPool.max_sockets_per_group);
            tablePrinter.addCell(origPool.pool_generation_number);
        }
        return tablePrinter;
    };

    SocketPoolWrapper.prototype = {
        /**
         * Returns a table printer containing information on all a
         * socket pool's groups.
         */
        createGroupTablePrinter: function() {
            var tablePrinter = new TablePrinter();
            tablePrinter.setTitle(this.fullName);

            tablePrinter.addHeaderCell('Name');
            tablePrinter.addHeaderCell('Pending');
            tablePrinter.addHeaderCell('Top Priority');
            tablePrinter.addHeaderCell('Active');
            tablePrinter.addHeaderCell('Idle');
            tablePrinter.addHeaderCell('Connect Jobs');
            tablePrinter.addHeaderCell('Backup Timer');
            tablePrinter.addHeaderCell('Stalled');

            for (var groupName in this.origPool.groups) {
                var group = this.origPool.groups[groupName];

                tablePrinter.addRow();
                tablePrinter.addCell(groupName);
                tablePrinter.addCell(group.pending_request_count);
                if (group.top_pending_priority != undefined)
                    tablePrinter.addCell(group.top_pending_priority);
                else
                    tablePrinter.addCell('-');

                tablePrinter.addCell(group.active_socket_count);
                var idleCell = tablePrinter.addCell(group.idle_sockets.length);
                var connectingCell = tablePrinter.addCell(group.connect_jobs.length);

                idleCell.link = sourceListLink(group.idle_sockets);
                connectingCell.link = sourceListLink(group.connect_jobs);

                tablePrinter.addCell(
                    group.backup_job_timer_is_running ? 'started' : 'stopped');
                tablePrinter.addCell(group.is_stalled);
            }
            return tablePrinter;
        }
    };

    /**
     * Takes in a list of source IDs and returns a link that will select the
     * specified sources.
     */
    function sourceListLink(sources) {
        if (!sources.length)
            return null;
        return '#events&q=id:' + sources.join(',');
    }

    return SocketPoolWrapper;
})();

// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * This view displays information on the state of all socket pools.
 *
 *   - Shows a summary of the state of each socket pool at the top.
 *   - For each pool with allocated sockets or connect jobs, shows all its
 *     groups with any allocated sockets.
 */
var SocketsView = (function() {
    'use strict';

    // We inherit from DivView.
    var superClass = DivView;

    /**
     * @constructor
     */
    function SocketsView() {
        assertFirstConstructorCall(SocketsView);

        // Call superclass's constructor.
        superClass.call(this, SocketsView.MAIN_BOX_ID);

        g_browser.addSocketPoolInfoObserver(this, true);
        this.socketPoolDiv_ = $(SocketsView.SOCKET_POOL_DIV_ID);
        this.socketPoolGroupsDiv_ = $(SocketsView.SOCKET_POOL_GROUPS_DIV_ID);

        var closeIdleButton = $(SocketsView.CLOSE_IDLE_SOCKETS_BUTTON_ID);
        closeIdleButton.onclick = this.closeIdleSockets.bind(this);

        var flushSocketsButton = $(SocketsView.SOCKET_POOL_FLUSH_BUTTON_ID);
        flushSocketsButton.onclick = this.flushSocketPools.bind(this);
    }

    SocketsView.TAB_ID = 'tab-handle-sockets';
    SocketsView.TAB_NAME = 'Sockets';
    SocketsView.TAB_HASH = '#sockets';

    // IDs for special HTML elements in sockets_view.html
    SocketsView.MAIN_BOX_ID = 'sockets-view-tab-content';
    SocketsView.SOCKET_POOL_DIV_ID = 'sockets-view-pool-div';
    SocketsView.SOCKET_POOL_GROUPS_DIV_ID = 'sockets-view-pool-groups-div';
    SocketsView.CLOSE_IDLE_SOCKETS_BUTTON_ID = 'sockets-view-close-idle-button';
    SocketsView.SOCKET_POOL_FLUSH_BUTTON_ID = 'sockets-view-flush-button';

    cr.addSingletonGetter(SocketsView);

    SocketsView.prototype = {
        // Inherit the superclass's methods.
        __proto__: superClass.prototype,

        onLoadLogFinish: function(data) {
            return this.onSocketPoolInfoChanged(data.socketPoolInfo);
        },

        onSocketPoolInfoChanged: function(socketPoolInfo) {
            this.socketPoolDiv_.innerHTML = '';
            this.socketPoolGroupsDiv_.innerHTML = '';

            if (!socketPoolInfo)
                return false;

            var socketPools = SocketPoolWrapper.createArrayFrom(socketPoolInfo);
            var tablePrinter = SocketPoolWrapper.createTablePrinter(socketPools);
            tablePrinter.toHTML(this.socketPoolDiv_, 'styled-table');

            // Add table for each socket pool with information on each of its groups.
            for (var i = 0; i < socketPools.length; ++i) {
                if (socketPools[i].origPool.groups != undefined) {
                    var p = addNode(this.socketPoolGroupsDiv_, 'p');
                    var br = addNode(p, 'br');
                    var groupTablePrinter = socketPools[i].createGroupTablePrinter();
                    groupTablePrinter.toHTML(p, 'styled-table');
                }
            }
            return true;
        },

        closeIdleSockets: function() {
            g_browser.sendCloseIdleSockets();
            g_browser.checkForUpdatedInfo(false);
        },

        flushSocketPools: function() {
            g_browser.sendFlushSocketPools();
            g_browser.checkForUpdatedInfo(false);
        }
    };

    return SocketsView;
})();

// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * This view displays the Alt-Svc mappings.
 */
var AltSvcView = (function() {
    'use strict';

    // We inherit from DivView.
    var superClass = DivView;

    /**
     * @constructor
     */
    function AltSvcView() {
        assertFirstConstructorCall(AltSvcView);

        // Call superclass's constructor.
        superClass.call(this, AltSvcView.MAIN_BOX_ID);

        g_browser.addAltSvcMappingsObserver(this, true);
    }

    AltSvcView.TAB_ID = 'tab-handle-alt-svc';
    AltSvcView.TAB_NAME = 'Alt-Svc';
    AltSvcView.TAB_HASH = '#alt-svc';

    // IDs for special HTML elements in alt_svc_view.html
    AltSvcView.MAIN_BOX_ID = 'alt-svc-view-tab-content';
    AltSvcView.ALTERNATE_PROTOCOL_MAPPINGS_ID =
        'alt-svc-view-alternate-protocol-mappings';

    cr.addSingletonGetter(AltSvcView);

    AltSvcView.prototype = {
        // Inherit the superclass's methods.
        __proto__: superClass.prototype,

        onLoadLogFinish: function(data) {
            // TODO(rch): Remove the check for spdyAlternateProtocolMappings after
            // M53 (It was renamed to altSvcMappings in M50).
            return this.onAltSvcMappingsChanged(
                data.altSvcMappings || data.spdyAlternateProtocolMappings);
        },

        /**
         * Displays the alternate service mappings.
         */
        onAltSvcMappingsChanged: function(altSvcMappings) {
            if (!altSvcMappings)
                return false;
            var input = new JsEvalContext({altSvcMappings: altSvcMappings});
            jstProcess(input, $(AltSvcView.ALTERNATE_PROTOCOL_MAPPINGS_ID));
            return true;
        }
    };

    return AltSvcView;
})();

// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * This view displays a summary of the state of each SPDY sessions, and
 * has links to display them in the events tab.
 */
var SpdyView = (function() {
    'use strict';

    // We inherit from DivView.
    var superClass = DivView;

    /**
     * @constructor
     */
    function SpdyView() {
        assertFirstConstructorCall(SpdyView);

        // Call superclass's constructor.
        superClass.call(this, SpdyView.MAIN_BOX_ID);

        g_browser.addSpdySessionInfoObserver(this, true);
        g_browser.addSpdyStatusObserver(this, true);
    }

    SpdyView.TAB_ID = 'tab-handle-spdy';
    SpdyView.TAB_NAME = 'HTTP/2';
    SpdyView.TAB_HASH = '#http2';

    // IDs for special HTML elements in spdy_view.html
    SpdyView.MAIN_BOX_ID = 'spdy-view-tab-content';
    SpdyView.STATUS_ID = 'spdy-view-status';
    SpdyView.SESSION_INFO_ID = 'spdy-view-session-info';

    cr.addSingletonGetter(SpdyView);

    SpdyView.prototype = {
        // Inherit the superclass's methods.
        __proto__: superClass.prototype,

        onLoadLogFinish: function(data) {
            return this.onSpdySessionInfoChanged(data.spdySessionInfo) &&
                this.onSpdyStatusChanged(data.spdyStatus);
        },

        /**
         * If |spdySessionInfo| contains any sessions, displays a single table with
         * information on each SPDY session.  Otherwise, displays "None".
         */
        onSpdySessionInfoChanged: function(spdySessionInfo) {
            if (!spdySessionInfo)
                return false;
            var input = new JsEvalContext({spdySessionInfo: spdySessionInfo});
            jstProcess(input, $(SpdyView.SESSION_INFO_ID));
            return true;
        },

        /**
         * Displays information on the global SPDY status.
         */
        onSpdyStatusChanged: function(spdyStatus) {
            if (!spdyStatus)
                return false;
            var input = new JsEvalContext(spdyStatus);
            jstProcess(input, $(SpdyView.STATUS_ID));
            return true;
        }
    };

    return SpdyView;
})();

// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * This view displays information on installed Chrome extensions / apps as well
 * as Winsock layered service providers and namespace providers.
 *
 * For each layered service provider, shows the name, dll, and type
 * information.  For each namespace provider, shows the name and
 * whether or not it's active.
 */
var ModulesView = (function() {
    'use strict';

    // We inherit from DivView.
    var superClass = DivView;

    /**
     * @constructor
     */
    function ModulesView() {
        assertFirstConstructorCall(ModulesView);

        // Call superclass's constructor.
        superClass.call(this, ModulesView.MAIN_BOX_ID);

        this.serviceProvidersTbody_ = $(ModulesView.SERVICE_PROVIDERS_TBODY_ID);
        this.namespaceProvidersTbody_ = $(ModulesView.NAMESPACE_PROVIDERS_TBODY_ID);

        g_browser.addServiceProvidersObserver(this, false);
        g_browser.addExtensionInfoObserver(this, true);
    }

    ModulesView.TAB_ID = 'tab-handle-modules';
    ModulesView.TAB_NAME = 'Modules';
    ModulesView.TAB_HASH = '#modules';

    // IDs for special HTML elements in modules_view.html.
    ModulesView.MAIN_BOX_ID = 'modules-view-tab-content';
    ModulesView.EXTENSION_INFO_ID = 'modules-view-extension-info';
    ModulesView.WINDOWS_SERVICE_PROVIDERS_ID =
        'modules-view-windows-service-providers';

    cr.addSingletonGetter(ModulesView);

    ModulesView.prototype = {
        // Inherit the superclass's methods.
        __proto__: superClass.prototype,

        onLoadLogFinish: function(data) {
            // Show the tab if there are either service providers or extension info.
            var hasExtensionInfo = this.onExtensionInfoChanged(data.extensionInfo);
            var hasSpiInfo = this.onServiceProvidersChanged(data.serviceProviders);
            return hasExtensionInfo || hasSpiInfo;
        },

        onExtensionInfoChanged: function(extensionInfo) {
            var input = new JsEvalContext({extensionInfo: extensionInfo});
            jstProcess(input, $(ModulesView.EXTENSION_INFO_ID));
            return !!extensionInfo;
        },

        onServiceProvidersChanged: function(serviceProviders) {
            var input = new JsEvalContext(serviceProviders);
            jstProcess(input, $(ModulesView.WINDOWS_SERVICE_PROVIDERS_ID));
            return !!serviceProviders;
        },
    };

    /**
     * Returns type of a layered service provider.
     */
    ModulesView.getLayeredServiceProviderType = function(serviceProvider) {
        if (serviceProvider.chain_length == 0)
            return 'Layer';
        if (serviceProvider.chain_length == 1)
            return 'Base';
        return 'Chain';
    };

    var SOCKET_TYPE = {
        '1': 'SOCK_STREAM',
        '2': 'SOCK_DGRAM',
        '3': 'SOCK_RAW',
        '4': 'SOCK_RDM',
        '5': 'SOCK_SEQPACKET'
    };

    /**
     * Returns socket type of a layered service provider as a string.
     */
    ModulesView.getLayeredServiceProviderSocketType = function(serviceProvider) {
        return tryGetValueWithKey(SOCKET_TYPE, serviceProvider.socket_type);
    };

    var PROTOCOL_TYPE = {
        '1': 'IPPROTO_ICMP',
        '6': 'IPPROTO_TCP',
        '17': 'IPPROTO_UDP',
        '58': 'IPPROTO_ICMPV6'
    };

    /**
     * Returns protocol type of a layered service provider as a string.
     */
    ModulesView.getLayeredServiceProviderProtocolType = function(
        serviceProvider) {
        return tryGetValueWithKey(PROTOCOL_TYPE, serviceProvider.socket_protocol);
    };

    var NAMESPACE_PROVIDER_PTYPE = {
        '12': 'NS_DNS',
        '15': 'NS_NLA',
        '16': 'NS_BTH',
        '32': 'NS_NTDS',
        '37': 'NS_EMAIL',
        '38': 'NS_PNRPNAME',
        '39': 'NS_PNRPCLOUD'
    };

    /**
     * Returns the type of a namespace provider as a string.
     */
    ModulesView.getNamespaceProviderType = function(namespaceProvider) {
        return tryGetValueWithKey(NAMESPACE_PROVIDER_PTYPE, namespaceProvider.type);
    };

    return ModulesView;
})();

// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * This view displays information related to Prerendering.
 */
var PrerenderView = (function() {
    'use strict';

    // We inherit from DivView.
    var superClass = DivView;

    /**
     * @constructor
     */
    function PrerenderView() {
        assertFirstConstructorCall(PrerenderView);

        // Call superclass's constructor.
        superClass.call(this, PrerenderView.MAIN_BOX_ID);

        g_browser.addPrerenderInfoObserver(this, true);
    }

    PrerenderView.TAB_ID = 'tab-handle-prerender';
    PrerenderView.TAB_NAME = 'Prerender';
    PrerenderView.TAB_HASH = '#prerender';

    // IDs for special HTML elements in prerender_view.html
    PrerenderView.MAIN_BOX_ID = 'prerender-view-tab-content';

    // Used in tests.
    PrerenderView.HISTORY_TABLE_ID = 'prerender-view-history-table';
    PrerenderView.ACTIVE_TABLE_ID = 'prerender-view-active-table';

    cr.addSingletonGetter(PrerenderView);

    PrerenderView.prototype = {
        // Inherit the superclass's methods.
        __proto__: superClass.prototype,

        onLoadLogFinish: function(data) {
            return this.onPrerenderInfoChanged(data.prerenderInfo);
        },

        onPrerenderInfoChanged: function(prerenderInfo) {
            if (!prerenderInfo)
                return false;
            var input = new JsEvalContext(prerenderInfo);
            jstProcess(input, $(PrerenderView.MAIN_BOX_ID));
            return true;
        }
    };

    return PrerenderView;
})();

// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * This view displays information on ChromeOS specific features.
 */
var CrosView = (function() {
    'use strict';

    var fileContent;
    var passcode = '';

    /**
     *  Clear file input div
     *
     *  @private
     */
    function clearFileInput_() {
        $(CrosView.IMPORT_DIV_ID).innerHTML = $(CrosView.IMPORT_DIV_ID).innerHTML;
        $(CrosView.IMPORT_ONC_ID)
            .addEventListener('change', handleFileChangeEvent_, false);
    }

    /**
     *  Send file contents and passcode to C++ cros network library.
     *
     *  @private
     */
    function importONCFile_() {
        clearParseStatus_();
        if (fileContent)
            g_browser.importONCFile(fileContent, passcode);
        else
            setParseStatus_('ONC file parse failed: cannot read file');
        clearFileInput_();
    }

    /**
     *  Set the passcode var, and trigger onc import.
     *
     *  @param {string} value The passcode value.
     *  @private
     */
    function setPasscode_(value) {
        passcode = value;
        if (passcode)
            importONCFile_();
    }

    /**
     *  Unhide the passcode prompt input field and give it focus.
     *
     *  @private
     */
    function promptForPasscode_() {
        $(CrosView.PASSCODE_ID).hidden = false;
        $(CrosView.PASSCODE_INPUT_ID).focus();
        $(CrosView.PASSCODE_INPUT_ID).select();
    }

    /**
     *  Set the fileContent var, and trigger onc import if the file appears to
     *  not be encrypted, or prompt for passcode if the file is encrypted.
     *
     *  @private
     *  @param {string} text contents of selected file.
     */
    function setFileContent_(result) {
        fileContent = result;
        // Parse the JSON to get at the top level "Type" property.
        var jsonObject;
        // Ignore any parse errors: they'll get handled in the C++ import code.
        try {
            jsonObject = JSON.parse(fileContent);
        } catch (error) {
        }
        // Check if file is encrypted.
        if (jsonObject && jsonObject.hasOwnProperty('Type') &&
            jsonObject.Type == 'EncryptedConfiguration') {
            promptForPasscode_();
        } else {
            importONCFile_();
        }
    }

    /**
     *  Clear ONC file parse status.  Clears and hides the parse status div.
     *
     *  @private
     */
    function clearParseStatus_(error) {
        var parseStatus = $(CrosView.PARSE_STATUS_ID);
        parseStatus.hidden = true;
        parseStatus.textContent = '';
    }

    /**
     *  Set ONC file parse status.
     *
     *  @private
     */
    function setParseStatus_(error) {
        var parseStatus = $(CrosView.PARSE_STATUS_ID);
        parseStatus.hidden = false;
        parseStatus.textContent = error ? 'ONC file parse failed: ' + error :
            'ONC file successfully parsed';
        reset_();
    }

    /**
     *  Set storing debug logs status.
     *
     *  @private
     */
    function setStoreDebugLogsStatus_(status) {
        $(CrosView.STORE_DEBUG_LOGS_STATUS_ID).innerText = status;
    }

    /**
     *  Set status for current debug mode.
     *
     *  @private
     */
    function setNetworkDebugModeStatus_(status) {
        $(CrosView.DEBUG_STATUS_ID).innerText = status;
    }

    /**
     *  An event listener for the file selection field.
     *
     *  @private
     */
    function handleFileChangeEvent_(event) {
        clearParseStatus_();
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function(e) {
            setFileContent_(reader.result);
        };
        reader.readAsText(file);
    }

    /**
     *  Add event listeners for the file selection, passcode input
     *  fields, for the button for debug logs storing and for buttons
     *  for debug mode selection.
     *
     *  @private
     */
    function addEventListeners_() {
        $(CrosView.IMPORT_ONC_ID)
            .addEventListener('change', handleFileChangeEvent_, false);

        $(CrosView.PASSCODE_INPUT_ID).addEventListener('change', function(event) {
            setPasscode_(this.value);
        }, false);

        $(CrosView.STORE_DEBUG_LOGS_ID).addEventListener('click', function(event) {
            $(CrosView.STORE_DEBUG_LOGS_STATUS_ID).innerText = '';
            g_browser.storeDebugLogs();
        }, false);

        $(CrosView.DEBUG_WIFI_ID).addEventListener('click', function(event) {
            setNetworkDebugMode_('wifi');
        }, false);
        $(CrosView.DEBUG_ETHERNET_ID).addEventListener('click', function(event) {
            setNetworkDebugMode_('ethernet');
        }, false);
        $(CrosView.DEBUG_CELLULAR_ID).addEventListener('click', function(event) {
            setNetworkDebugMode_('cellular');
        }, false);
        $(CrosView.DEBUG_WIMAX_ID).addEventListener('click', function(event) {
            setNetworkDebugMode_('wimax');
        }, false);
        $(CrosView.DEBUG_NONE_ID).addEventListener('click', function(event) {
            setNetworkDebugMode_('none');
        }, false);
    }

    /**
     *  Reset fileContent and passcode vars.
     *
     *  @private
     */
    function reset_() {
        fileContent = undefined;
        passcode = '';
        $(CrosView.PASSCODE_ID).hidden = true;
    }

    /**
     *  Enables or disables debug mode for a specified subsystem.
     *
     *  @private
     */
    function setNetworkDebugMode_(subsystem) {
        $(CrosView.DEBUG_STATUS_ID).innerText = '';
        g_browser.setNetworkDebugMode(subsystem);
    }

    /**
     *  @constructor
     *  @extends {DivView}
     */
    function CrosView() {
        assertFirstConstructorCall(CrosView);

        // Call superclass's constructor.
        DivView.call(this, CrosView.MAIN_BOX_ID);

        g_browser.addCrosONCFileParseObserver(this);
        g_browser.addStoreDebugLogsObserver(this);
        g_browser.addSetNetworkDebugModeObserver(this);
        addEventListeners_();
    }

    CrosView.TAB_ID = 'tab-handle-chromeos';
    CrosView.TAB_NAME = 'ChromeOS';
    CrosView.TAB_HASH = '#chromeos';

    CrosView.MAIN_BOX_ID = 'chromeos-view-tab-content';
    CrosView.IMPORT_DIV_ID = 'chromeos-view-import-div';
    CrosView.IMPORT_ONC_ID = 'chromeos-view-import-onc';
    CrosView.PASSCODE_ID = 'chromeos-view-password-div';
    CrosView.PASSCODE_INPUT_ID = 'chromeos-view-onc-password';
    CrosView.PARSE_STATUS_ID = 'chromeos-view-parse-status';
    CrosView.STORE_DEBUG_LOGS_ID = 'chromeos-view-store-debug-logs';
    CrosView.STORE_DEBUG_LOGS_STATUS_ID = 'chromeos-view-store-debug-logs-status';
    CrosView.DEBUG_WIFI_ID = 'chromeos-view-network-debugging-wifi';
    CrosView.DEBUG_ETHERNET_ID = 'chromeos-view-network-debugging-ethernet';
    CrosView.DEBUG_CELLULAR_ID = 'chromeos-view-network-debugging-cellular';
    CrosView.DEBUG_WIMAX_ID = 'chromeos-view-network-debugging-wimax';
    CrosView.DEBUG_NONE_ID = 'chromeos-view-network-debugging-none';
    CrosView.DEBUG_STATUS_ID = 'chromeos-view-network-debugging-status';

    cr.addSingletonGetter(CrosView);

    CrosView.prototype = {
        // Inherit from DivView.
        __proto__: DivView.prototype,

        onONCFileParse: setParseStatus_,
        onStoreDebugLogs: setStoreDebugLogsStatus_,
        onSetNetworkDebugMode: setNetworkDebugModeStatus_,
    };

    return CrosView;
})();

// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/** This view displays summary statistics on bandwidth usage. */
var BandwidthView = (function() {
    'use strict';

    // We inherit from DivView.
    var superClass = DivView;

    /**
     * @constructor
     */
    function BandwidthView() {
        assertFirstConstructorCall(BandwidthView);

        // Call superclass's constructor.
        superClass.call(this, BandwidthView.MAIN_BOX_ID);

        g_browser.addSessionNetworkStatsObserver(this, true);
        g_browser.addHistoricNetworkStatsObserver(this, true);

        // Register to receive data reduction proxy info.
        g_browser.addDataReductionProxyInfoObserver(this, true);

        // Register to receive bad proxy info.
        g_browser.addBadProxiesObserver(this, true);

        this.sessionNetworkStats_ = null;
        this.historicNetworkStats_ = null;
    }

    BandwidthView.TAB_ID = 'tab-handle-bandwidth';
    BandwidthView.TAB_NAME = 'Bandwidth';
    BandwidthView.TAB_HASH = '#bandwidth';

    // IDs for special HTML elements in bandwidth_view.html
    BandwidthView.MAIN_BOX_ID = 'bandwidth-view-tab-content';
    BandwidthView.ENABLED_ID = 'data-reduction-proxy-enabled';
    BandwidthView.PROXY_CONFIG_ID = 'data-reduction-proxy-config';
    BandwidthView.PROBE_STATUS_ID = 'data-reduction-proxy-probe-status';
    BandwidthView.BYPASS_STATE_CONTAINER_ID =
        'data-reduction-proxy-bypass-state-container';
    BandwidthView.BYPASS_STATE_ID = 'data-reduction-proxy-bypass-state-details';
    BandwidthView.EVENTS_TBODY_ID = 'data-reduction-proxy-view-events-tbody';
    BandwidthView.EVENTS_UL = 'data-reduction-proxy-view-events-list';
    BandwidthView.STATS_BOX_ID = 'bandwidth-stats-table';

    cr.addSingletonGetter(BandwidthView);

    BandwidthView.prototype = {
        // Inherit the superclass's methods.
        __proto__: superClass.prototype,

        data_reduction_proxy_config_: null,
        last_bypass_: null,
        bad_proxy_config_: null,

        onLoadLogFinish: function(data) {
            return this.onBadProxiesChanged(data.badProxies) &&
                this.onDataReductionProxyInfoChanged(data.dataReductionProxyInfo) &&
                (this.onSessionNetworkStatsChanged(data.sessionNetworkStats) ||
                    this.onHistoricNetworkStatsChanged(data.historicNetworkStats));
        },

        /**
         * Retains information on bandwidth usage this session.
         */
        onSessionNetworkStatsChanged: function(sessionNetworkStats) {
            this.sessionNetworkStats_ = sessionNetworkStats;
            return this.updateBandwidthUsageTable_();
        },

        /**
         * Displays information on bandwidth usage this session and over the
         * browser's lifetime.
         */
        onHistoricNetworkStatsChanged: function(historicNetworkStats) {
            this.historicNetworkStats_ = historicNetworkStats;
            return this.updateBandwidthUsageTable_();
        },

        /**
         * Updates the UI based on receiving changes in information about the
         * data reduction proxy summary.
         */
        onDataReductionProxyInfoChanged: function(info) {
            $(BandwidthView.EVENTS_TBODY_ID).innerHTML = '';

            if (!info)
                return false;

            if (info.enabled) {
                $(BandwidthView.ENABLED_ID).innerText = 'Enabled';
                $(BandwidthView.PROBE_STATUS_ID).innerText =
                    info.probe != null ? info.probe : 'N/A';
                this.last_bypass_ = info.last_bypass;
                this.data_reduction_proxy_config_ = info.proxy_config.params;
            } else {
                $(BandwidthView.ENABLED_ID).innerText = 'Disabled';
                $(BandwidthView.PROBE_STATUS_ID).innerText = 'N/A';
                this.data_reduction_proxy_config_ = null;
            }

            this.updateDataReductionProxyConfig_();

            for (var eventIndex = info.events.length - 1; eventIndex >= 0;
                 --eventIndex) {
                var event = info.events[eventIndex];
                var headerRow = addNode($(BandwidthView.EVENTS_TBODY_ID), 'tr');
                var detailsRow = addNode($(BandwidthView.EVENTS_TBODY_ID), 'tr');

                var timeCell = addNode(headerRow, 'td');
                var actionCell = addNode(headerRow, 'td');
                var detailsCell = addNode(detailsRow, 'td');
                detailsCell.colSpan = 2;
                detailsCell.className = 'data-reduction-proxy-view-events-details';
                var eventTime = timeutil.convertTimeTicksToDate(event.time);
                timeutil.addNodeWithDate(timeCell, eventTime);
                this.buildEventRow_(event, actionCell, detailsCell);
            }

            return true;
        },

        /**
         * Updates the UI based on receiving changes in information about bad
         * proxy servers.
         */
        onBadProxiesChanged: function(badProxies) {
            if (!badProxies)
                return false;

            var newBadProxies = [];
            if (badProxies.length == 0) {
                this.last_bypass_ = null;
            } else {
                for (var i = 0; i < badProxies.length; ++i) {
                    var entry = badProxies[i];
                    newBadProxies[entry.proxy_uri] = entry.bad_until;
                }
            }
            this.bad_proxy_config_ = newBadProxies;
            this.updateDataReductionProxyConfig_();

            return true;
        },

        /**
         * Update the bandwidth usage table.  Returns false on failure.
         */
        updateBandwidthUsageTable_: function() {
            var sessionNetworkStats = this.sessionNetworkStats_;
            var historicNetworkStats = this.historicNetworkStats_;
            if (!sessionNetworkStats || !historicNetworkStats)
                return false;

            var sessionOriginal = sessionNetworkStats.session_original_content_length;
            var sessionReceived = sessionNetworkStats.session_received_content_length;
            var historicOriginal =
                historicNetworkStats.historic_original_content_length;
            var historicReceived =
                historicNetworkStats.historic_received_content_length;

            var rows = [];
            rows.push({
                title: 'Original (KB)',
                sessionValue: bytesToRoundedKilobytes_(sessionOriginal),
                historicValue: bytesToRoundedKilobytes_(historicOriginal)
            });
            rows.push({
                title: 'Received (KB)',
                sessionValue: bytesToRoundedKilobytes_(sessionReceived),
                historicValue: bytesToRoundedKilobytes_(historicReceived)
            });
            rows.push({
                title: 'Savings (KB)',
                sessionValue:
                    bytesToRoundedKilobytes_(sessionOriginal - sessionReceived),
                historicValue:
                    bytesToRoundedKilobytes_(historicOriginal - historicReceived)
            });
            rows.push({
                title: 'Savings (%)',
                sessionValue: getPercentSavings_(sessionOriginal, sessionReceived),
                historicValue: getPercentSavings_(historicOriginal, historicReceived)
            });

            var input = new JsEvalContext({rows: rows});
            jstProcess(input, $(BandwidthView.STATS_BOX_ID));
            return true;
        },

        /**
         * Renders a Data Reduction Proxy event into the event tbody
         */
        buildEventRow_: function(event, actionCell, detailsCell) {
            if (event.type == EventType.DATA_REDUCTION_PROXY_ENABLED &&
                event.params.enabled == 0) {
                addTextNode(actionCell, 'DISABLED');
            } else {
                var actionText =
                    EventTypeNames[event.type].replace('DATA_REDUCTION_PROXY_', '');
                if (event.phase == EventPhase.PHASE_BEGIN ||
                    event.phase == EventPhase.PHASE_END) {
                    actionText = actionText + ' (' +
                        getKeyWithValue(EventPhase, event.phase).replace('PHASE_', '') +
                        ')';
                }

                addTextNode(actionCell, actionText);
                this.createEventTable_(event.params, detailsCell);
            }
        },

        /**
         * Updates the data reduction proxy summary block.
         */
        updateDataReductionProxyConfig_: function() {
            $(BandwidthView.PROXY_CONFIG_ID).innerHTML = '';
            $(BandwidthView.BYPASS_STATE_ID).innerHTML = '';
            setNodeDisplay($(BandwidthView.BYPASS_STATE_CONTAINER_ID), false);

            if (this.data_reduction_proxy_config_) {
                var hasBypassedProxy = false;
                var now = timeutil.getCurrentTimeTicks();

                if (this.last_bypass_ &&
                    this.hasTimePassedLogTime_(+this.last_bypass_.params.expiration)) {
                    // Best effort on iterating the config to search for a bad proxy.
                    // A server could exist in a string member of
                    // data_reduction_proxy_config_ or within an array of servers in an
                    // array member of data_reduction_proxy_config_. As such, search
                    // through all string members and string arrays.
                    for (var key in this.data_reduction_proxy_config_) {
                        var value = this.data_reduction_proxy_config_[key];
                        if (typeof value == 'string') {
                            if (this.isMarkedAsBad_(value)) {
                                hasBypassedProxy = true;
                                break;
                            }
                        } else if (value instanceof Array) {
                            for (var index = 1; index < value.length; index++) {
                                if (this.isMarkedAsBad_(value[index])) {
                                    hasBypassedProxy = true;
                                }
                            }

                            if (hasBypassedProxy) {
                                break;
                            }
                        }
                    }
                }

                if (hasBypassedProxy) {
                    this.createEventTable_(
                        this.last_bypass_.params, $(BandwidthView.BYPASS_STATE_ID));
                }

                this.createEventTable_(
                    this.data_reduction_proxy_config_,
                    $(BandwidthView.PROXY_CONFIG_ID));
                setNodeDisplay(
                    $(BandwidthView.BYPASS_STATE_CONTAINER_ID), hasBypassedProxy);
            }
        },

        /**
         * Checks to see if a proxy server is in marked as bad.
         */
        isMarkedAsBad_: function(proxy) {
            for (var entry in this.bad_proxy_config_) {
                if (entry == proxy &&
                    this.hasTimePassedLogTime_(this.bad_proxy_config_[entry])) {
                    return true;
                }
            }

            return false;
        },

        /**
         * Checks to see if a given time in ticks has passed the time of the
         * the log. For real time viewing, this is "now", but for loaded logs, it
         * is the time at which the logs were taken.
         */
        hasTimePassedLogTime_: function(timeTicks) {
            var logTime;
            if (MainView.isViewingLoadedLog() && ClientInfo.numericDate) {
                logTime = ClientInfo.numericDate;
            } else {
                logTime = timeutil.getCurrentTime();
            }

            return timeutil.convertTimeTicksToTime(timeTicks) > logTime;
        },

        /**
         * Creates a table of the object obj. Certain keys are special cased for
         * ease of readability.
         */
        createEventTable_: function(obj, parentNode) {
            if (Object.keys(obj).length > 0) {
                var tableNode = addNode(parentNode, 'table');
                tableNode.className = 'borderless-table';
                for (var key in obj) {
                    var value = obj[key];
                    if (value != null && value.toString() != '') {
                        if (key == 'net_error') {
                            if (value == 0) {
                                value = 'OK';
                            } else {
                                value = netErrorToString(value);
                            }
                        } else if (key == 'bypass_type') {
                            value = getKeyWithValue(DataReductionProxyBypassEventType, value);
                        } else if (key == 'bypass_action_type') {
                            value =
                                getKeyWithValue(DataReductionProxyBypassActionType, value);
                        } else if (key == 'expiration') {
                            value = timeutil.convertTimeTicksToDate(value);
                        }
                        var tableRow = addNode(tableNode, 'tr');
                        addNodeWithText(tableRow, 'td', key);
                        addNodeWithText(tableRow, 'td', value);
                    }
                }
            }
        }
    };

    /**
     * Converts bytes to kilobytes rounded to one decimal place.
     */
    function bytesToRoundedKilobytes_(val) {
        return (val / 1024).toFixed(1);
    }

    /**
     * Returns bandwidth savings as a percent rounded to one decimal place.
     */
    function getPercentSavings_(original, received) {
        if (original > 0) {
            return ((original - received) * 100 / original).toFixed(1);
        }
        return '0.0';
    }

    return BandwidthView;
})();


document.addEventListener('DOMContentLoaded', function() {
    MainView.getInstance();  // from main.js
});
