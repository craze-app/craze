# Katkı Rehberi
Bu projeye katkıda bulunmak için aşağıdaki adımları takip edebilirsiniz:

## Issue'lar
Katkıda bulunmak istediğiniz özellik veya hatayı düzeltmek için öncelikle bir issue açın. Bu issue'ya yorum bırakarak üstünüzü atayın ve katkıda bulunmaya başlayın.

## Branch'ler
- Hatayı düzeltmek için: `fix/bug-name` şeklinde bir branch oluşturun.
- Yeni özellik eklemek için: `feature/feature-name` şeklinde bir branch oluşturun.

## Kodlama
> Eğer kodda bir düzenleme yapacaksanız, öncelikle [Kodlama Stili Dökümanı](/docs/CODESTYLE-tr.md)'nı inceleyin.

Özellikler için standart olarak belirtilen dosya yapısını kullanın. Özellik dosya yapısı için öncellikle `/src/featyes/FeatureName` dizinini oluşturun. Aşağıdaki dosyalar bu dizin içerisinde yer almalıdır:

- `FeatureName.tsx`: Feature'ın oluşturulduğu ana dosyadır. Bu React bileşeni içerisinde herhangi bir logic kodu yazılmamalıdır. Ayrıca içerisinde zorunlu olan InputBar ve OutputBar bileşenlerini içermelidir.
- `FeatureName.service.ts`: Yapılan özelliğin logic kodları bu servis sınıfında yazılmalıdır.
- `FeatureName.store.ts`: zustand kullanılarak state yönetimi her feature'a özel store dosyasında yapılmalıdır.
- `FeatureName.types.ts`: TypeScript için feature'a özel type/interface/enum gibi tanımlar bu dosyada yapılmalıdır ve export edilmelidir.
- `FeatureName.module.scss`: React bileşeni içerisindeki stil tanımlamaları module.css ve scss kullanılarak bu dosyada yapılmalıdır.

Ayrıca her yeni feature için en az bir test olması gerekmektedir. Oluşturduğunuz servis dosyasındaki logicleri test etmek için:
- `/test/unit/services` dizininze `FeatureName.spec.ts` adında bir test dosyası oluşturun.

Son olarak geliştirdiğiniz feature'ın uygulamada görünür olabilmesi için `/src/features.tsx` dosyasındaki features listesine ekleyin.

## Test ve Build

Geliştirme sürecinde `yarn dev` komutunu kullanarak electron uygulamasını kendi bilgisayarınızda çalıştırabilirsiniz. Geliştirme sürecini tamamladığınızda ise şu adımları sırasıyla uygulayın:

- `yarn lint` komutunu çalıştırarak kod stiline uygunluğunu doğrulayın.
- `yarn test` komutunu çalıştırarak tüm testlerin başarıyla tamamlandığı doğrulayın.
- `yarn build` komutunu çalıştırarak yazılımın stabil bir şekilde masaüstü uygulaması içerisine aktarılabildiğini doğrulayın.

## Pull Request
Değişikliklerinizi tamamladıktan sonra açtığınız branch'e kodlarınızı commitleyin ve pushlayın. GitHub'da bir pull request açın ve neleri değiştirdiğinizi ve nasıl düzelttiğinizi belirtin. Eğer bir feature eklediyseniz ekran görüntüsü eklemeyi de unutmayın. Ayrıca hedef branch olarak `develop` branchini kullanmalısınız. `main` branchine sadece yeni release paylaşılacağı zaman merge işlemi yapılmaktadır.
