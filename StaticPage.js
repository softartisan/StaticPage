/**
  * Convert String that contain a .html page to HTMLDocument
  * @type {Function}
  * @param  {String} html
  * @return {HTMLDocument}
  */
const parseDom = (html) => {
  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(html, 'text/html');
  return parsedDocument;
};

/**
  * Uses HTMLDocument that contain a .html page to HTMLElement <body/>
  * without scripts elements.
  * @type {Function}
  * @param  {HTMLDocument} parsedDocument
  * @return {HTMLElement} without scripts elements
  */
const getBodyWithoutScripts = (parsedDocument) => {
  const body = parsedDocument.querySelector('body');
  const scripts = body.querySelectorAll('script');
  scripts.forEach((script) => {
    script.parentElement.removeChild(script);
  });
  return body;
};

/**
  * Uses HTMLDocument that contain a .html page to HTMLElement <head/>
  * without scripts elements.
  * @type {Function}
  * @param  {HTMLDocument} parsedDocument
  * @return {HTMLElement} without scripts elements
  */
const getHeadWithoutScripts = (parsedDocument) => {
  const head = parsedDocument.querySelector('head');
  const scripts = head.querySelectorAll('script');
  scripts.forEach((script) => {
    script.parentElement.removeChild(script);
  });
  return head;
};

/**
  * Uses HTMLDocument that contain a .html page to get <html/> element classes.
  * @type {Function}
  * @param  {HTMLDocument} parsedDocument
  * @return {String} classes of the <html> element
  */
const getHtmlClasses = parsedDocument => parsedDocument.querySelector('html').className;

/**
  * Uses HTMLDocument that contain a .html page to get an Array of scripts element
  * that are contained in the <body/> element.
  * @type {Function}
  * @param  {HTMLDocument} parsedDocument
  * @return {Array} scripts elements in the <body/> element.
  */
const getBodyScripts = (parsedDocument) => {
  const scripts = parsedDocument.querySelector('body').querySelectorAll('script');
  const scriptsProcessed = Array.from(scripts).map(script => ({
    inner: script.innerHTML || '',
    src: script.src || '',
    outerHtml: script.outerHTML,
    id: script.id || '',
    async: script.async,
    defer: script.defer,
    crossOrigin: script.crossOrigin || '',
    charset: script.charset || '',
  }));
  return scriptsProcessed;
};

/**
  * Uses HTMLDocument that contain a .html page to get an Array of scripts element
  * that are contained in the <head/> element.
  * @type {Function}
  * @param  {HTMLDocument} parsedDocument
  * @return {Array} scripts elements in the <head/> element.
  */
const getHeadScripts = (parsedDocument) => {
  const scripts = parsedDocument.querySelector('head').querySelectorAll('script');
  const scriptsProcessed = Array.from(scripts).map(script => ({
    inner: script.innerHTML || '',
    src: script.src || '',
    outerHtml: script.outerHTML,
    id: script.id || '',
    async: script.async,
    defer: script.defer,
    crossOrigin: script.crossOrigin || '',
    charset: script.charset || '',
  }));
  return scriptsProcessed;
};

/**
  * Insert the new <head/> element with the processed scripts
  * that are reactive and loads async.
  * @type {Function}
  * @param  {HTMLElement} newHead
  * @param  {HTMLElement} htmlElement
  * @param  {Array} headScripts
  */
const buildHead = (newHead, htmlElement, headScripts) => {
  htmlElement.appendChild(newHead);
  headScripts.forEach((script) => {
    const newScript = document.createElement('script');
    if (script.inner) {
      const inlineScript = document.createTextNode(script.inner);
      newScript.appendChild(inlineScript);
    }
    if (script.src) {
      newScript.src = script.src;
      newScript.id = script.id;
      newScript.async = script.async;
      newScript.defer = script.defer;
      newScript.crossOrigin = script.crossOrigin;
      newScript.charset = script.charset;
    }
    document.querySelector('head').appendChild(newScript);
  });
};

/**
  * Insert the new <body/> element with the processed scripts
  * that are reactive and loads async.
  * @type {Function}
  * @param  {HTMLElement} newBody
  * @param  {HTMLElement} htmlElement
  * @param  {Array} bodyScripts
  */
const buildBody = (newBody, htmlElement, bodyScripts) => {
  htmlElement.appendChild(newBody);
  bodyScripts.forEach((script) => {
    const newScript = document.createElement('script');
    if (script.inner) {
      const inlineScript = document.createTextNode(script.inner);
      newScript.appendChild(inlineScript);
    }
    if (script.src) {
      newScript.src = script.src;
      newScript.id = script.id;
      newScript.async = script.async;
      newScript.defer = script.defer;
      newScript.crossOrigin = script.crossOrigin;
      newScript.charset = script.charset;
    }
    document.querySelector('body').appendChild(newScript);
  });
};

/**
  * Insert the new classes for the <html/> element.
  * @type {Function}
  * @param  {String} newHtmlClasses
  * @param  {HTMLElement} htmlElement
  */
const cleanHtml = (newHtmlClasses, htmlElement) => {
  htmlElement.removeChild(document.querySelector('head'));
  htmlElement.removeChild(document.querySelector('body'));
  htmlElement.className = newHtmlClasses;
};

/**
  * Destroy the actual page and render a new one from
  * a String.
  * @type {Function}
  * @param  {String} htmlString
  */
const build = (htmlString) => {
  const parsedDocument = parseDom(htmlString);
  const headScripts = getHeadScripts(parsedDocument);
  const bodyScripts = getBodyScripts(parsedDocument);
  const newHead = getHeadWithoutScripts(parsedDocument);
  const newBody = getBodyWithoutScripts(parsedDocument);
  const newHtmlClasses = getHtmlClasses(parsedDocument);
  const htmlElement = document.querySelector('html');

  cleanHtml(newHtmlClasses, htmlElement);
  buildHead(newHead, htmlElement, headScripts);
  buildBody(newBody, htmlElement, bodyScripts);
};

export default build;