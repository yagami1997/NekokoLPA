import React from 'react';
import {Alert, FlatList, StyleSheet, ToastAndroid,} from 'react-native';
import {useTranslation} from 'react-i18next';
import {SafeScreen} from '@/components/template';
import type {RootScreenProps} from "@/screens/navigation";
import Title from "@/components/common/Title";
import Container from "@/components/common/Container";
import {BorderRadiuses, Colors, ListItem, Text, View} from "react-native-ui-lib";
import {useSelector} from "react-redux";
import {selectDeviceState} from "@/redux/stateStore";
import Clipboard from "@react-native-clipboard/clipboard";
import {useTheme} from "@/theme";

export type EuiccInfoDataType = {
	key: string;
	rendered: any;
}

function EuiccInfo({ route,  navigation }: RootScreenProps<'EuiccInfo'>) {
	const { deviceId } = route.params;
	const DeviceState = useSelector(selectDeviceState(deviceId!));
	const { colors, variant } = useTheme();

	const { t } = useTranslation(['euiccinfo']);


	const { eid, euiccAddress, euiccInfo2 } = DeviceState;


	const renderRow = (row: EuiccInfoDataType, id: number, t: any) => {
		return (
			<ListItem
				activeBackgroundColor={colors.std400}
				activeOpacity={0.3}
				onPress={() => {
					ToastAndroid.show('Value Copied', ToastAndroid.SHORT);
					Clipboard.setString(row.rendered)
				}}
				style={{ borderBottomWidth: 0.25, borderBottomColor: colors.std900 }}
			>
				<ListItem.Part left>
					{/*<Image source={{uri: row.mediaUrl}} style={styles.image}/>*/}
				</ListItem.Part>
				<ListItem.Part middle column containerStyle={[styles.border]}>
					<ListItem.Part containerStyle={{marginBottom: 3}}>
						<Text color={colors.std200}  text70BL style={{flex: 1, marginRight: 10}} numberOfLines={1}>
							{t('euiccinfo:' + row.key)}
						</Text>
						<Text color={colors.std200} text70L style={{marginTop: 2}}>
							{row.rendered}
						</Text>
					</ListItem.Part>
				</ListItem.Part>
			</ListItem>
		);
	}
	return (
		<SafeScreen>
			<Title>{t('euiccinfo:euiccinfo')}</Title>
			<Container>
				<FlatList
					data={[
						{key: "eid", rendered: `${eid}` },
						{key: "freeNonVolatileMemory", rendered: `${euiccInfo2?.extCardResource.freeNonVolatileMemory} B` },
						{key: "freeVolatileMemory", rendered: `${euiccInfo2?.extCardResource.freeVolatileMemory} B` },
						{key: "defaultDpAddress", rendered: euiccAddress?.defaultDpAddress },
						{key: "rootDsAddress", rendered: euiccAddress?.rootDsAddress },
						{key: "sasAcreditationNumber", rendered: euiccInfo2?.sasAcreditationNumber },
						{key: "svn", rendered: euiccInfo2?.svn },
						{key: "profileVersion", rendered: euiccInfo2?.profileVersion },
						{key: "globalplatformVersion", rendered: euiccInfo2?.globalplatformVersion },
						{key: "euiccFirmwareVer", rendered: euiccInfo2?.euiccFirmwareVer },
					]}
					renderItem={({item, index}) => renderRow(item, index, t)}
					keyExtractor={(item: EuiccInfoDataType) => item.key}
				/>
			</Container>
		</SafeScreen>
	);

}

const styles = StyleSheet.create({
	image: {
		width: 54,
		height: 54,
		borderRadius: BorderRadiuses.br20,
		marginHorizontal: 14
	},
	border: {
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: Colors.grey70
	}
});
export default EuiccInfo;
