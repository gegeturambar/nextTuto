import { AddEdit } from 'components/cars';
import { carService } from 'services';

export default AddEdit;

export async function getServerSideProps({ params }) {
    const car = await carService.getById(params.id);

    return {
        props: { car }
    }
}