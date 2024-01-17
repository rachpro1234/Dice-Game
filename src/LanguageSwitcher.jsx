/* eslint-disable no-unused-vars */
import React  from "react"
import { useTranslation } from "react-i18next"

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    
    
    const handleLanguageChange = (e) =>  {
     const newLanguage = e.target.value;
     i18n.changeLanguage(newLanguage);
}

return (
    <select value={i18n.language} onChange={handleLanguageChange} className="translate">
        <option value="en">Englich</option>
        <option value="gr">Deutsch</option>
        <option value="es">Español</option>
    </select>
);
};

export default LanguageSwitcher;