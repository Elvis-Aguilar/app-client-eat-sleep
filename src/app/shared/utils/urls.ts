export class UrlsUtils {
  static listUrls: string[] = [
    'https://www.momondo.es/himg/63/d1/0a/expediav2-51060-3d808d-232963.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy_EEIqfQXlCdC484ypMPgIBqoFL5exw-0Ag&s',
    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/87/22/be/hotel-victorias.jpg?w=1200&h=-1&s=1',
    'https://cdn0.uncomo.com/es/posts/1/9/2/servicios_de_cafeteria_47291_12_600.jpg',
    'https://media-cdn.tripadvisor.com/media/photo-s/2b/52/75/c5/caption.jpg',
    'https://image-tc.galaxy.tf/wijpeg-dmgseqrawzguu07plej7lstz4/garden-view-double-room_standard.jpg?crop=134%2C0%2C1653%2C1240',
  ];

  // img Restaurants
  static listUrlsRestaurants: string[] = [
    'https://digital.ihg.com/is/image/ihg/intercontinental-guatemala-city-10311963602-2x1',
    'https://resizer.otstatic.com/v2/photos/wide-large/2/51528329.png',
    'https://www.guatemala.com/fotos/2019/01/Brule-Gourmet-885x500.jpg',
    'https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2024/07/30/2213/PTYUB-P0277-American-Bazaar-Dining-Area.jpg/PTYUB-P0277-American-Bazaar-Dining-Area.16x9.jpg',
    'https://i0.wp.com/foodandpleasure.com/wp-content/uploads/2024/06/prosecco.jpg?fit=1500%2C1000&ssl=1',
    'https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2021/09/11/16313139674620.jpg',
    'https://image-tc.galaxy.tf/wijpeg-83ujmoda2l0jj70cm9omdyf67/phdl-restaurante-1.jpg?width=1920'
  ];

  public static getRandomUrl(): string {
    const randomIndex = Math.floor(Math.random() * this.listUrls.length);
    return this.listUrls[randomIndex];
  }

  public static getRandomUrlRestaurant(): string {
    const randomIndex = Math.floor(Math.random() * this.listUrlsRestaurants.length);
    return this.listUrlsRestaurants[randomIndex];
  }
}
