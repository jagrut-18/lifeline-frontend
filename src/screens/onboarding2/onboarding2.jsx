import './onboarding2.css';
import '../../components/user_type_select/user_type_select';
import DoctorOnboarding from './doctor';
import PatientOnboarding from './patient';
import { UserTypeContext } from '../../components/user_type_select/user_type_context';
import React from 'react';

export default function OnboardingScreen2() {
  const userType = React.useContext(UserTypeContext);
  console.log(userType);

  return (
    <div>
        { userType == 'doctor' ? <DoctorOnboarding /> : <PatientOnboarding /> }
    </div>    
  )

}