import React from 'react';
import { BaseViewStyles, H3, LoggedViewStyles, PrimaryRedButton } from './BaseViewStyles';

import { BluetoothScreenHeaderComponent } from '../components/BluetoothSetup/BluetoothScreenHeaderComponent';
import { BluetoothDeviceInfoComponent } from '../components/BluetoothSetup/BluetoothDeviceInfoComponent';
import { BluetoothConnectionErrorModal } from '../components/BluetoothSetup/BluetoothConnectionErrorModal';
import { BluetoothTestSEmgModal } from '../components/BluetoothSetup/BluetoothTestSEmgModal';
import { BluetoothFesConfigModal } from '../components/BluetoothSetup/BluetoothFesConfigModal';
import { useBluetoothContext } from '../context/BluetoothContext';


export function BluetoothSetupScreen() {
  const {
    showSEmgTestModal, showFesTestModal, showConnectionErrorModal
  } = useBluetoothContext();
    return (
        <BaseViewStyles>
            <LoggedViewStyles style={{ flex: 1}}>
                <BluetoothScreenHeaderComponent/>
                <BluetoothDeviceInfoComponent />
                {
                  showConnectionErrorModal
                  &&
                  <BluetoothConnectionErrorModal/>
                }
                {
                  showFesTestModal
                  &&
                  <BluetoothFesConfigModal/>
                }
                {
                  showSEmgTestModal
                  && 
                  <BluetoothTestSEmgModal/>
                }
            </LoggedViewStyles>
        </BaseViewStyles>
    );
}


