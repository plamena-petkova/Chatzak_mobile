import EmojiPicker from 'rn-emoji-keyboard'

export default EmojiPicker = () => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false)

    const handlePick = (emojiObject) => {
      console.log(emojiObject)
      /* example emojiObject = {
          "emoji": "❤️",
          "name": "red heart",
          "slug": "red_heart",
          "unicode_version": "0.6",
        }
      */
    }
  
    return <EmojiPicker onEmojiSelected={handlePick} open={isOpen} onClose={() => setIsOpen(false)} />
}

