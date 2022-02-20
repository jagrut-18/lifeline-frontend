import React from 'react';
import './onboarding2.css';
import '../../components/user_type_select/user_type_select';
import DoctorOnboarding from './doctor';
import PatientOnboarding from './patient';

export default function OnboardingScreen2() {
  const userTypeId = localStorage.getItem('user_type_id')
  
  return (
    <div>
      {
        userTypeId == '1' ?
          <PatientOnboarding />
          :
          <DoctorOnboarding />
      }
    </div>
  )

}