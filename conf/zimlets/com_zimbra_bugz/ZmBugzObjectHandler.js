/*
 * ***** BEGIN LICENSE BLOCK *****
 * Version: ZPL 1.1
 * 
 * The contents of this file are subject to the Zimbra Public License
 * Version 1.1 ("License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://www.zimbra.com/license
 * 
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See
 * the License for the specific language governing rights and limitations
 * under the License.
 * 
 * The Original Code is: Zimbra Collaboration Suite.
 * 
 * The Initial Developer of the Original Code is Zimbra, Inc.
 * Portions created by Zimbra are Copyright (C) 2005 Zimbra, Inc.
 * All Rights Reserved.
 * 
 * Contributor(s):
 * 
 * ***** END LICENSE BLOCK *****
 */

function ZmBugzObjectHandler() {
}

ZmBugzObjectHandler.prototype = new ZmZimletBase;
ZmBugzObjectHandler.prototype.constructor = ZmBugzObjectHandler;

ZmBugzObjectHandler.prototype.init =
function() {
	var stylesheet = this.getResource("bugz.xsl");
	this._processor = AjxXslt.createFromUrl(stylesheet);
};

ZmBugzObjectHandler.prototype.match =
function(content, startIndex) {
	if(!this.RE) {return;}
	this.RE.lastIndex = startIndex;
	var match = this.RE.exec(content);
	if (match) match.context = match[1];
	return match;
};

ZmBugzObjectHandler.prototype.toolTipPoppedUp =
function(spanElement, obj, context, canvas) {
	canvas.innerHTML = "<b>ID: </b>"+context;
	var bug_url = this.getConfig("url")+context;
	var url = ZmZimletBase.PROXY + AjxStringUtil.urlEncode(bug_url);
	AjxRpc.invoke(null, url, null, new AjxCallback(this, ZmBugzObjectHandler._callback, canvas), true);
};

ZmBugzObjectHandler._callback =
function(canvas, result) {
	var xslt = this._processor;
	var resp = result.xml;
	var html = xslt.transformToString(resp);
	canvas.innerHTML = html;
};

