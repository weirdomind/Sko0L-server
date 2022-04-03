import { AvatarGenerator } from "random-avatar-generator";

const generator = new AvatarGenerator();

const generateMultipleAvatars = (count: number) => {
  const avatars = [];
  for (let i = 0; i < count; i++) {
    avatars.push(generator.generateRandomAvatar());
  }
  return avatars;
};

export default generateMultipleAvatars;
