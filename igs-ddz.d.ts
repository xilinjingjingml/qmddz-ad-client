export declare namespace igs { }
export declare namespace igs.util {
    function dateFormat(fmt: any, date: any): any;
}
export declare namespace igs.platform {
    interface TrackEventDetail {
        uploadToPlatform?: {
            k: string;
            v: any;
        }[];
    }
}
export declare namespace igs.platform {
    function trackEvent(name: string, detail?: igs.platform.TrackEventDetail): void;
}
