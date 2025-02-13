function delegateEvent(parentElement, selector, eventType, callback) {
  if (!(parentElement && parentElement instanceof Element)) return undefined;
  let elems = parentElement.querySelectorAll(selector);
  console.log(elems);

  if (elems.length > 0) {
    elems.forEach((elem) => {
      elem.addEventListener(eventType, callback);
    });

    return true;
  } else {
    return undefined;
  }
}
