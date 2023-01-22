import { useRef, useState, useEffect } from 'react';
// material

export function LanguageChange() {


  //google translate
  const googleTranslateElementInit = () => {
    //@ts-ignore
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false,
        includedLanguages: "hi,bn"
      },
      "google_translate_element"
    );
  };
  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    //@ts-ignore
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);


  return (
    <>
      <div id="google_translate_element">.</div>
    </>
  );
}
