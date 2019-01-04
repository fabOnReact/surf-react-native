export function ErrorMessage(props) {
  const { message } = props;
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{ message }</Text>
    </View>
  );
}