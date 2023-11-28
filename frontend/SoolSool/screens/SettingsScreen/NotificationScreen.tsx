import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useQuery } from "react-query";
import { fetchNotice } from "../../api/noticeApi";

function NotificationCard({ title, content, date }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardContent}>{content}</Text>
      <Text style={styles.cardDate}>{date}</Text>
    </View>
  );
}

function NotificationScreen() {
  const [noticeData, setNoticeData] = useState(null);

  const { data: notificationData, isLoading } = useQuery(
    "notificationData",
    async () => await fetchNotice()
  );

  useEffect(() => {
    if (!isLoading && notificationData) {
      console.log("공지사항 확인용", notificationData);
      setNoticeData(notificationData.notices);
    }
  }, [notificationData, isLoading]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainTitle}>공지사항</Text>
      {noticeData?.map((notice) => (
        <NotificationCard
          key={notice.id}
          title={notice.title}
          content={notice.content}
          date={notice.date}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: "95%",
    marginRight: "auto",
    marginLeft: "auto",
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F6F6F6",
    marginBottom: 20,
    padding: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardContent: {
    fontSize: 16,
  },
  cardDate: {
    fontSize: 12,
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default NotificationScreen;
