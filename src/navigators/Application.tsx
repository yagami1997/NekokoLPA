import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, NavigationContainerRef} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {NekokoLPA, Profile, Scanner} from '@/screens';
import {useTheme} from '@/theme';

import type {RootStackParamList} from '@/navigators/navigation';
import ErrorToast from "@/components/common/ErrorToast";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/reduxDataStore";
import InfiLPA from "@/native/InfiLPA";
import {Linking} from "react-native";
import {LPACode} from "@/components/utils/lpaRegex";

const Stack = createStackNavigator<RootStackParamList>();


function ApplicationNavigator() {
	const { variant, navigationTheme } = useTheme();
	const {currentEuicc} = useSelector((state: RootState) => state.LPA);
	const navigationRef = React.createRef<NavigationContainerRef<RootStackParamList>>();
	const [reset, setReset] = useState(0);

	const processUrl = (url: string) => {
		if (url) {
			console.log("App Link: URL", url);
			const match = url.match(LPACode);
			if (match && match[0].length) {
				console.log("App Link Matched: URL", url);
				navigationRef.current?.navigate('Scanner', {
					appLink: url,
				});
			}
		}
	}

	useEffect(() => {
		if (navigationRef) {
			Linking.addEventListener('url', ({url}) => processUrl(url));
			const getUrlAsync = async () => {
				try {
					const linkUrl = await Linking.getInitialURL();
					if (linkUrl) {
						processUrl(linkUrl);
					}
				} catch (e) {}
			};
			getUrlAsync();
		}
	}, [navigationRef]);

	return (
		<SafeAreaProvider style={{ backgroundColor: "transparent" }}>
			<NavigationContainer theme={navigationTheme} ref={navigationRef}>
				<Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
					<Stack.Screen name="NekokoLPA" component={NekokoLPA} />
					<Stack.Screen name="Scanner" component={Scanner} />
					<Stack.Screen name="Profile" component={Profile} />
				</Stack.Navigator>
				<ErrorToast eUICC={currentEuicc} />
			</NavigationContainer>
		</SafeAreaProvider>
	);
}

export default ApplicationNavigator;
