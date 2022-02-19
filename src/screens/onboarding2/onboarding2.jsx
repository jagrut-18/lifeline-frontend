import React from 'react';
import './onboarding2.css';
import '../../components/user_type_select/user_type_select';
import DoctorOnboarding from './doctor';
import PatientOnboarding from './patient';
import { UserTypeContext } from '../../components/user_type_select/user_type_context';

export default function OnboardingScreen2() {
  const userType = React.useContext(UserTypeContext);

  return (
    <div>
      {
        userType == 'doctor' ?
          <DoctorOnboarding />
          :
          <PatientOnboarding />
      }
      {
        userType == 'patient' ?
          <PatientOnboarding />
          :
          null
      }
    </div>
  )

}