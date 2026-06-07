import { WebPlugin } from '@capacitor/core';
import type { CapacitorTwilioVoicePlugin, CallInvite, AudioDevice } from './definitions';
export declare class CapacitorTwilioVoiceWeb extends WebPlugin implements CapacitorTwilioVoicePlugin {
    private device;
    private activeCall;
    private activeCalls;
    private pendingInvites;
    private accessToken;
    private currentWarnings;
    private selectedOutputDeviceId;
    private hasExplicitRingtoneDevice;
    private static readonly HARD_CLEANUP_TIMEOUT_MS;
    login(options: {
        accessToken: string;
    }): Promise<{
        success: boolean;
    }>;
    logout(): Promise<{
        success: boolean;
    }>;
    isLoggedIn(): Promise<{
        isLoggedIn: boolean;
        hasValidToken: boolean;
        identity?: string;
    }>;
    makeCall(options: {
        to: string;
        params?: Record<string, string>;
    }): Promise<{
        success: boolean;
        callSid?: string;
    }>;
    acceptCall(options: {
        callSid: string;
    }): Promise<{
        success: boolean;
    }>;
    rejectCall(options: {
        callSid: string;
    }): Promise<{
        success: boolean;
    }>;
    endCall(options: {
        callSid?: string;
    }): Promise<{
        success: boolean;
    }>;
    muteCall(options: {
        muted: boolean;
        callSid?: string;
    }): Promise<{
        success: boolean;
    }>;
    sendDigits(options: {
        digits: string;
        callSid?: string;
    }): Promise<{
        success: boolean;
    }>;
    setSpeaker(options: {
        enabled: boolean;
    }): Promise<{
        success: boolean;
    }>;
    getCallStatus(): Promise<{
        hasActiveCall: boolean;
        isOnHold: boolean;
        isMuted: boolean;
        callSid?: string;
        callState?: string;
        pendingInvites: CallInvite[];
        activeCallsCount: number;
    }>;
    checkMicrophonePermission(): Promise<{
        granted: boolean;
    }>;
    requestMicrophonePermission(): Promise<{
        granted: boolean;
    }>;
    getAudioDevices(): Promise<{
        inputs: AudioDevice[];
        outputs: AudioDevice[];
    }>;
    setInputDevice(options: {
        deviceId: string;
    }): Promise<{
        success: boolean;
    }>;
    setOutputDevice(options: {
        deviceId: string;
    }): Promise<{
        success: boolean;
    }>;
    setRingtoneDevice(options: {
        deviceId: string;
    }): Promise<{
        success: boolean;
    }>;
    private static warningFilterInstalled;
    /**
     * Install a one-time console.warn filter that swallows exactly one
     * benign Twilio AudioHelper message we cannot intercept upstream:
     *
     *   [TwilioVoice][AudioHelper] Warning: Unable to set audio output devices.
     *   InvalidArgumentError: Devices not found: default
     *
     * Emitted by the SDK during Device construction on Safari / older Firefox
     * (browsers that don't expose a synthetic "default" audiooutput entry in
     * enumerateDevices). All other console.warn output passes through
     * untouched.
     */
    private static installAudioHelperWarningFilter;
    /**
     * Resolve a usable audiooutput device ID without relying on the synthetic
     * "default" string that only Chrome/Edge expose. Returns null when the
     * environment has no enumerable output devices (no permission yet, or a
     * headless context). Callers should treat null as "skip the set() and
     * let the Twilio SDK keep whatever it picked".
     */
    private resolveDefaultOutputDeviceId;
    presentAudioRoutePicker(): Promise<{
        success: boolean;
    }>;
    getPluginVersion(): Promise<{
        version: string;
    }>;
    /**
     * Tear down a Call's internal WebRTC and backoff machinery to break ICE
     * restart loops. This is the "hard" phase — only run AFTER the graceful
     * disconnect has had time to send the hangup message via PStream.
     *
     * The SDK's ICE loop is driven by direct property callbacks and a backoff
     * timer (not EventEmitter listeners), so removeAllListeners() alone is
     * insufficient. We must:
     *   1. Reset the backoff timer that schedules iceRestart()
     *   2. Null out _mediaHandler property callbacks
     *   3. Close the RTCPeerConnection
     *   4. Remove EventEmitter + PStream listeners
     */
    private hardCleanupCall;
    private wireDeviceEvents;
    private wireCallEvents;
    private handleCallDisconnected;
    private base64UrlDecode;
    private isTokenExpired;
    private getIdentityFromToken;
    private getCallSid;
    private mapCallStatus;
    private callCustomParamsToRecord;
    private emitAudioDevicesChanged;
    /**
     * Dispatch a window CustomEvent as a fallback for Capacitor proxy listener
     * registration bug where only the first addListener call succeeds.
     * useTwilioVoice.ts listens for these events as a backup delivery path.
     */
    private dispatchFallbackEvent;
}
