import amplitude from 'amplitude-js';

export const initAmplitude = () => {
  amplitude.getInstance().init(process.env.REACT_APP_AMPLITUDE);
};

export const setUserId = userId => {
    amplitude.getInstance().setUserId(userId);
};

export const setUserProperties = properties => {
    amplitude.getInstance().setUserProperties(properties);
};

export const trackEvent = (eventType, eventProperties) => {
    amplitude.getInstance().logEvent(eventType, eventProperties);
};