import React from 'react';
import {
	StyleSheet,
	View,
	Text,
} from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { DraxProvider, DraxList, DraxViewDragStatus } from 'react-native-drax';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const getBackgroundColor = (alphaIndex: number) => {
	switch (alphaIndex % 6) {
		case 0:
			return '#ffaaaa';
		case 1:
			return '#aaffaa';
		case 2:
			return '#aaaaff';
		case 3:
			return '#ffffaa';
		case 4:
			return '#ffaaff';
		case 5:
			return '#aaffff';
		default:
			return '#aaaaaa';
	}
};

const getHeight = (alphaIndex: number) => {
	let height = 50;
	if (alphaIndex % 2 === 0) {
		height += 10;
	}
	if (alphaIndex % 3 === 0) {
		height += 20;
	}
	return height;
};

const getItemStyleTweaks = (alphaItem: string) => {
	const alphaIndex = alphabet.indexOf(alphaItem);
	return {
		backgroundColor: getBackgroundColor(alphaIndex),
		height: getHeight(alphaIndex),
	};
};

const ReorderableList = () => {
	const [alphaData, setAlphaData] = React.useState(alphabet);
	const insets = useSafeArea();
	return (
		<DraxProvider>
			<View
				style={[
					styles.container,
					{
						paddingTop: insets.top,
						paddingLeft: insets.left,
						paddingRight: insets.right,
					},
				]}
			>
				<DraxList
					data={alphaData}
					renderItemContent={({ item }, { viewState, hover }) => (
						<View
							style={[
								styles.alphaItem,
								getItemStyleTweaks(item),
								(viewState?.dragStatus === DraxViewDragStatus.Dragging && hover)
									? styles.hover
									: undefined,
							]}
						>
							<Text style={styles.alphaText}>{item}</Text>
						</View>
					)}
					onItemReorder={({ fromIndex, toIndex }) => {
						const newData = alphaData.slice();
						newData.splice(toIndex, 0, newData.splice(fromIndex, 1)[0]);
						setAlphaData(newData);
					}}
					keyExtractor={(item) => item}
					ListHeaderComponent={() => (
						<View style={styles.header}>
							<Text style={styles.headerText}>
								Long-press any list item to drag it to a new position.
								Dragging an item over the top or bottom edge of the container
								will automatically scroll the list. Swiping up or down
								without the initial long-press will scroll the list normally.
							</Text>
						</View>
					)}
				/>
			</View>
		</DraxProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		padding: 12,
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerText: {
		fontSize: 16,
		fontStyle: 'italic',
	},
	alphaItem: {
		backgroundColor: '#aaaaff',
		borderRadius: 8,
		margin: 4,
		padding: 4,
		justifyContent: 'center',
		alignItems: 'center',
	},
	alphaText: {
		fontSize: 28,
	},
	hover: {
		borderColor: 'blue',
		borderWidth: 2,
	},
});

export default ReorderableList;
