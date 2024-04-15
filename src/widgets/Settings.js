import React, { useState } from 'react';

import './Settings.css'

function Settings() {

    const [showSettings, setShowSettings] = useState(false);

    let settingsList = [
        "eventCode",
        "minQual",
        "maxQual",
        "includeDead"
    ]

    const settingsListUI = () => {
        let list = [];
        for (let i = 0; i < settingsList.length; i++) {
            let setting = settingsList[i];
            list.push(
                <div className="setting-card" key={i}>
                    <div className="setting-name">
                        <div className="settings-text">
                            {setting}:
                        </div>
                    </div>
                    <div className="setting-current">
                        <div className="settings-text">
                            {localStorage.getItem(setting) === null ? "Unset" : localStorage.getItem(setting)}
                        </div>
                    </div>  
                    <div className="change-button" onClick={() => handleSettingEdit(setting)}>
                        <div className="settings-text">
                            Edit
                        </div>
                    </div>
                </div>
            );
        }
        return list;
    }

    const handleSettingEdit = (setting) => {
        let newValue = prompt(`Type new ${setting}:`);
        localStorage.setItem(setting, newValue);
    }

    const settingsWindow = () => {
        return (
            <div className="settings-window">
                {settingsListUI()}
            </div>
        )
    }

    const display = () => {
        return showSettings ? settingsWindow() : null;
    }

    const handleToggle = () => {
        setShowSettings(!showSettings);
    }

    return (
        <div>
            <div className="settings-button" onClick={() => handleToggle()}>
                <div className="settings-button-text">
                    Settings
                </div>
            </div>
            {display()}
        </div>
    );
}

export default Settings