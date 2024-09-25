import { faker } from '@faker-js/faker';

// Single Album Structure
function generateAlbum() {
  return {
    Type: 0,
    Name: faker.music.genre(),  // Generates a random music genre as album name
    AlbumOwner: faker.name.fullName(),  // Generates a random full name for the album owner
    AltText: faker.lorem.sentence(),  // Generates random alt text
    ItemsCount: faker.number.int({ min: 1, max: 50 }),  // Random number of items (between 1 and 50)
    ImageUrl: "https://picsum.photos/200",  // Generates a random image URL
    Id: faker.number.int({ min: 1, max: 1000 }), // Random album ID
  }
}

const generateAlbumChildren = () => {
  return  {
      Type: faker.number.int({ min: 1, max: 2 }), 
      
      // Album/Folder properties
      Name: faker.music.genre(),
      AlbumOwner: faker.name.fullName(),
      ItemsCount: faker.number.int({ min: 1, max: 50 }),
      
      // Shared properties
      AltText: faker.lorem.sentence(),
      ImageUrl: "https://picsum.photos/200", 
      Id: faker.number.int({ min: 1, max: 1000 }), 
    }
}

export function generateAlbumList(count = 10) {
  return Array.from({ length: count }, () => generateAlbum());
}

export function generateChildrenAlbumList(count = 10) {
  return Array.from({ length: count }, () => generateAlbumChildren());
}