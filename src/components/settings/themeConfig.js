import { Switch } from 'antd';
import { useState } from 'react';

export default function ThemeConfig() {
  const isDarkThemeJSON = localStorage.getItem('isDarkTheme');

  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeJSON === undefined ? false : JSON.parse(isDarkThemeJSON));

  function setWithLocalStorage(isChecked) {
    localStorage.setItem('isDarkTheme', JSON.stringify(isChecked));
    document.documentElement.classList.toggle('dark-theme', isChecked);

    setIsDarkTheme(isChecked);
  }

  return (
    <div className="settings-section">
      <label className="settings-theme">
        <Switch checked={isDarkTheme} onChange={setWithLocalStorage}/>
      Dark theme
      </label>

    </div>
  );
}
