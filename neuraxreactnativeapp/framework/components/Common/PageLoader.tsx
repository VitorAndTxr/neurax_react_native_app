import styled from "styled-components"
import { TailSpin } from "react-loader-spinner";
import React from "react";
import { View } from "react-native";

interface PageLoaderProps{
    spinnerColor:string
}

export default function PageLoader(props:PageLoaderProps){
    return(
        <View>

            <TailSpin
                color={props.spinnerColor}
                height={100}
                width={100}
            />
        </View>
    )
}

