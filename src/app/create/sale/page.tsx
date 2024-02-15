import { CreateSaleAdvert } from 'CreateAdvert/pages';

export default function CreateAdPage(props: { searchParams: { id: number } }) {
    return <CreateSaleAdvert id={props.searchParams.id} />;
}
