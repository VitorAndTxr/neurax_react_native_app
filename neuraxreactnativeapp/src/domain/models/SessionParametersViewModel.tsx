
export interface SessionParametersViewModel {
    amplitude: number;
    frequency: number;
    minPulseWidth: number;
    maxPulseWidth: number;
    pulseDuration: number;
}

export interface SessionViewModel {
    id: string;
    startWristAmplitudeMeasurement:number
    finishWristAmplitudeMeasurement:number
}

