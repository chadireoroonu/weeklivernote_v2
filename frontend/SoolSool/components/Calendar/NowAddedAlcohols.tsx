import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

function NowAddedAlcohols({ alcoholRecord, onDeleteRecord }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(alcoholRecord.length);
  }, [alcoholRecord]);

  // console.log(`지금 넘어온 술 기록 개수는 ${count}개`);

  // 해당 인덱스의 주종 음주 기록 삭제
  const handleDelete = (index) => {
    onDeleteRecord(index);
  };

  return (
    <View style={styles.total}>
      {alcoholRecord.length ? (
        <View style={styles.oneline}>
          {alcoholRecord.map((record, index) => (
            <View key={index} style={styles.alcoholInfo}>
              <Text style={styles.innerText}>
                {record.category}
                <Text style={styles.innerText}> {record.drinkAmount}</Text>
                <Text style={styles.innerText}>{record.drinkUnit} </Text>
              </Text>
              <TouchableOpacity onPress={() => handleDelete(index)}>
                <Text style={styles.deleteButton}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.textBox}>
          <Text style={styles.text}>추가 버튼을 눌러 마신 술을 기록하세요</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  total: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    paddingVertical: 5,
  },
  oneline: {
    flex: 0.5,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  alcoholInfo: {
    flexDirection: "row",
    marginRight: 5,
    marginBottom: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    height: "100%",
    borderWidth: 1,
    borderColor: "#363C4B",
    borderRadius: 50,
  },
  innerText: {
    fontSize: 14,
  },
  textBox: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    justifyContent: "center",
  },
  deleteButton: {
    // position: "absolute",
    top: 0,
    right: 0,
    fontSize: 16,
    color: "red",
  },
});

export default NowAddedAlcohols;
