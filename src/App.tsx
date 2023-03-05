import React, { useState, useCallback } from 'react';

export function App() {
    const [hardwareInfo, setHardwareInfo] = useState<Record<string, unknown>>({});

    const fetchHardwareInfo = useCallback(async () => {
        const hardwareInfo = await window.api.getHardwareInfo();
        setHardwareInfo(hardwareInfo);
    }, []);

    return (
        <div>
            <p>Please press the button to fetch your hardware info:</p>
            <button onClick={fetchHardwareInfo}>Fetch</button>
            <pre>
                {JSON.stringify(hardwareInfo, null, 2)}
            </pre>
        </div>
    );
}
