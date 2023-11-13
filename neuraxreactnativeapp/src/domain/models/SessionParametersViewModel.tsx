
export interface SessionParametersViewModel {
    amplitude: number;
    frequency: number;
    minPulseWidth: number;
    maxPulseWidth: number;
    stimulationTime: number;
}

export interface SessionViewModel {
    id: string;
    startWristAmplitudeMeasurement:number
    finishWristAmplitudeMeasurement:number
}

