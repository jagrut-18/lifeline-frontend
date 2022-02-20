import './user_type.css';
import UserTypeSelect from '../../components/user_type_select/user_type_select';
import { useNavigate } from 'react-router-dom';
import routes from '../../routing/routes';

export default function UserTypeScreen() {
    const navigate = useNavigate();

    function onNext() {
        navigate(routes.signup);
    }

    return (
        <div className="container">
            <UserTypeSelect onNext={onNext} />
        </div>
    )
} 