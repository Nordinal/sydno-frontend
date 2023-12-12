
export interface IList {
    fetcher: ({page}: {page?: number}) => unknown;
    
}


const List = ({fetcher}: IList) => {

    return (
        <div>

        </div>
    );
}