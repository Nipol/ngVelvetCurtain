# Velvet Curtain

Velvet Curtain은, 사진 파일을 공유하기 위해서 특정 서비스에 사진을 업로드하고, 링크를 공유하는 불편함을 최소화 하고자 만들어진 Decentralized Application(이하 DApp)입니다. 해시 값을 통해서 앨범 또는 사진을 가져오고 관리할 수 있습니다. 이는 Electron과 Vuejs 기술로 이뤄진 DApp으로, 별도의 서비스 페이지를 제공하지 않습니다.

## Try
```sh
$ yarn instatll

$ yarn serve
```

## Structure
```
User's
  ├───Photos (MFS)          사용자가 가지고 있는 모든 이미지들의 집합
  │   ├───Image-A (Hash)    Photos 앨범에 포함된 이미지
  │   ├───Image-B (Hash)    Photos 앨범에 포함된 이미지
  │   └───Image-C (Hash)    Photos 앨범에 포함된 이미지
  │
  ├───Stared (MFS)          사용자의 정의 앨범, 이미지들의 집합
  │   ├───Image-A (Hash)    Photos 앨범에 포함된 이미지 (복사됨)
  │   └───Image-C (Hash)    Photos 앨범에 포함된 이미지 (복사됨)
  │
  └───Album (MFS)           앨범이 가지고 있는 이미지들의 목록
      ├───Image (Hash)      Photos 앨범에 포함된 이미지
      ...
```

## TODO
 - [x] Integrated go-ipfs
 - [ ] Multi Platform Electron build
 - [x] Photo Album
 - [x] Multi File Upload
 - [ ] maybe... muon?

## Color
  * [Light Theme](https://colorhunt.co/palette/112572)
  * [Dark Theme](https://colorhunt.co/palette/114174)
