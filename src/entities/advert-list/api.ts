// import { instanceApi } from '@/shared/configs/instanceAxios';
import testData from './testData';

export const fetchAdvertList = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(testData);
        }, 3000);
    });
}

export const addAdvertToFavorites = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 3000);
    });
}
