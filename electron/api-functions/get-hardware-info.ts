
import { execFileSync } from 'child_process';

import { ipcRenderer } from 'electron';

function cleanInfo(info: string) {
    return info
        .trim()
        .replaceAll('\r', '')
        .replaceAll(/[\r\n]+/g, ',')
        .replaceAll(/,{2,}/g, ',')
        .split(',');
}

export const getHardwareInfo: API['getHardwareInfo'] = {
    execute: async () => {
        const gpuInfo = cleanInfo(execFileSync('wmic', ['path', 'win32_VideoController', 'get', 'name', '/format:list']).toString());
        const cpuInfo = cleanInfo(execFileSync('wmic', ['cpu', 'get', 'name', '/format:list']).toString().trim());
        const ramManufacturerInfo = cleanInfo(execFileSync('wmic', ['memorychip', 'get', 'manufacturer', '/format:list']).toString().trim());

        const moboInfo = cleanInfo(execFileSync('wmic', ['baseboard', 'get', 'product', '/format:list']).toString().trim());
        const storageInfo = cleanInfo(execFileSync('wmic', ['logicaldisk', 'get', 'size', '/format:list']).toString().trim());

        const totalRam = cleanInfo(execFileSync('wmic', ['memorychip', 'get', 'capacity', '/format:list']).toString().trim());
        const keyboardInfo = cleanInfo(execFileSync('wmic', ['path', 'win32_keyboard', 'get', 'name', '/format:list']).toString().trim());
        const mouseInfo = cleanInfo(execFileSync('wmic', ['path', 'win32_pointingdevice', 'get', 'name', '/format:list']).toString().trim());

        const osInfo = cleanInfo(execFileSync('wmic', ['os', 'get', 'Caption', '/format:list']).toString().trim());
        const osVersionInfo = cleanInfo(execFileSync('wmic', ['os', 'get', 'Version', '/format:list']).toString().trim());
        const osArchitectureInfo = cleanInfo(execFileSync('wmic', ['os', 'get', 'OSArchitecture', '/format:list']).toString().trim());

        return {
            gpu: gpuInfo,
            cpu: cpuInfo,
            ram: ramManufacturerInfo,
            totalRam: totalRam,
            mobo: moboInfo,
            storage: storageInfo,
            keyboard: keyboardInfo,
            mouse: mouseInfo,
            os: osInfo,
            osVersion: osVersionInfo,
            osArchitecture: osArchitectureInfo,
        };
    },
    handle: async () => {
        return await ipcRenderer.invoke('getHardwareInfo');
    },
};
