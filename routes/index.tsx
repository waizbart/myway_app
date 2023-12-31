import React from "react";
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import { useAuth } from "../hooks/useAuth";

export default function Routes() {
    const { signed } = useAuth()

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
                flex: 1,
                backgroundColor: '#0000'
            }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {
                    signed ?
                        <PrivateRoutes /> :
                        <PublicRoutes />
                }
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView >
    )
}