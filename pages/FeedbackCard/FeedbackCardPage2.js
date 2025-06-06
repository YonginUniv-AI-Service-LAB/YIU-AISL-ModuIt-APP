import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import styles from './FeedbackCardPage2.styles';
import WhiteRoundedContainer from '../../components/common/WhiteRoundedContainer';
import NextButton from '../../components/Button/NextButton';
import BottomTabBar from '../../components/common/BottomTabBar';
import ProgressCircle from '../../components/Graph/ProgressCircle';
import routineStyles from '../../components/Routine/RoutineItem.styles';
import sectionStyles from '../../components/Routine/RoutineSection.styles';

const { width, height } = Dimensions.get('window');

export default function FeedbackCardPage({ navigation, route }) {
  // 변경된 부분: route.params에서 전달된 체크되지 않은 루틴 가져오기
  const { unchecked, checked } = route.params;

  return (
    <View style={styles.container}>
      {/* 상단 연보라색 배경 */}
      <View style={styles.purpleHeader} />
      {/* 상단 텍스트 */}
      <Text style={styles.headerText}>오늘 너무 잘했어요!</Text>

      {/* 아래 카드 영역 */}
      <WhiteRoundedContainer style={styles.whiteContainer}>
        {/* 퍼센트 그래프 추가 */}
        <View style={localStyles.progressWrapper}>
          <ProgressCircle />
        </View>

        {/* 진행하지 않은 루틴 헤더 */}
        <Text style={sectionStyles.sectionHeader}>진행하지 않은 루틴</Text>

        {/* 스크롤뷰로 전체 내용을 감싸고, 체크 되지 않은 루틴, NextButton도 포함 */}
        <ScrollView
          style={{ maxHeight: height * 0.37 }}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {/* ↓↓ 수정된 부분: 섹션 헤더와 아이템 렌더링 */}
          <View style={sectionStyles.sectionContainer}>
            {/* TODO: 추후 API 연결 할 때 수정할 부분 */}
            {unchecked.map((item) => (
              <View key={item.id} style={routineStyles.itemRow}>
                <View style={routineStyles.routineBox}>
                  <View style={routineStyles.leftBar} />
                  <View style={routineStyles.itemTextContainer}>
                    <Text style={routineStyles.itemTime}>{item.time}</Text>
                    <Text style={routineStyles.itemTitle}>{item.title}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </WhiteRoundedContainer>

      {/* 다음 버튼 */}
      <NextButton
        onPress={() =>
          navigation.navigate('FeedbackCard3', { unchecked, checked })
        }
      >
      </NextButton>

      <BottomTabBar currentTab="routine" onTabPress={() => {}} />
    </View>
  );
}

//export default function FeedbackCardPage({ navigation }) {
//  return (
//    <View style={styles.container}>
//      {/* 상단 연보라색 배경 */}
//      <View style={styles.purpleHeader} />
//        {/* 상단 텍스트 */}
//        <Text style={styles.headerText}>오늘 너무 잘했어요!</Text>
//      {/* 아래 카드 영역 */}
//      <WhiteRoundedContainer>
//        {/* 퍼센트 그래프 추가 */}
//        <View style={{ marginTop: -px(105), marginBottom: px(15) }}>
//          <ProgressCircle />
//        </View>
//        {/* 카드 안 내용 */}
//        <NextButton onPress={() => navigation.navigate('FeedbackCard3')} />
//      </WhiteRoundedContainer>
//
//      <BottomTabBar currentTab="routine" onTabPress={() => {}} />
//
//    </View>
//  );
//}

const localStyles = StyleSheet.create({
  progressWrapper: {
    marginTop: -height * 0.125, // 약 -105px → 844 기준
    marginBottom: height * 0.018, // 약 15px
  },
});
