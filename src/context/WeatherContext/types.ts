export interface IWeatherProvider {
    children: React.ReactNode;
}

export interface IWeatherContext {
    weatherData: any;
    isGeolocationFound: boolean;
    setIsGeolocationFound?: React.Dispatch<React.SetStateAction<boolean>>;
    setWeatherData?: React.Dispatch<React.SetStateAction<any>>;
}
