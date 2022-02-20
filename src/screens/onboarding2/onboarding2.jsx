import React from 'react';
import './onboarding2.css';
import '../../components/user_type_select/user_type_select';
import DoctorOnboarding from './doctor';
import PatientOnboarding from './patient';
import InsuranceOnboarding from './insurance';

export default function OnboardingScreen2() {
  const userTypeId = localStorage.getItem('user_type_id');

  function onboardingComponent(){
    if (userTypeId == '1') {
      return <PatientOnboarding />;
    }
    else if (userTypeId == '2') {
      return <DoctorOnboarding />;
    }
    return <InsuranceOnboarding />;
  }
  
  return (
    <div>
      {onboardingComponent()}
    </div>
  )

}