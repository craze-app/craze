# Kodlama Stili Dökümanı

Craze uygulamasını geliştirirken dikkat ettiğimiz bazı noktalar var. Eğer açık kaynak bu projeye katkı yapmak istiyorsanız bu belirlenen kurallara uymalısınız. Bu sayede uygulama sürdürülebilir kalacaktır. Eğer katkı yapmak istiyorsanız ve okumadıysanız öncelikle [Katkı Rehberine](/CONTRIBUTING-tr.md) göz atabilirsiniz.

## Codebase
Craze, [Electron](https://www.electronjs.org/) kullanılarak geliştirilmiş cross-platform bir masaüstü uygulamasıdır. Hem server, hem de client tarafında kod güvenirliğini sağlamak için [TypeScript](https://www.typescriptlang.org/) kullanılmaktadır. Client tarafında ise dinamik render/state yönetimi gibi işleri kolaylaştırmak için [React](https://reactjs.org/) tercih edilmiştir.

> Craze topluluğun ortak bir uygulama geliştirmesi amacıyla oluşturulduğu için TypeScript ve React seçimi Twitter'da yapılan anket ile belirlenmiştir.

## Linter/Formatter
Uygulamayı geliştirirken standart bir stile sahip olmak için [ESLint](https://eslint.org/) ve [Prettier](https://prettier.io/) tercih edilmiştir. Prettier, ESLint'e bağlı bir şekilde çalıştığı için kullandığınız editör veya IDE'de ESLint eklentisini aktifleştirmeniz yeterli olacaktır.


## Komut Satırı ile Feature Oluşturmak
Craze içerisine yeni bir özellik eklemek isteyenlerin işlerini hızlandırmak için bir komut dosyası oluşturduk. Komut satırından aşağıdaki kodu çalıştırdığınızda komut sizin için `src/features` dizininde belirttiğiniz isimde bir feature dosya yapısı kuracaktır. Ayrıca yeni bir feature oluşturmak için bu komutu kullanmak zorunda değilsiniz, bu sadece yardımcı bir komuttur. Unutmayın ki oluşturulan feature dosyalarında herhangi bir logic olmayacaktır ve içinizi sizin doldurmanız gerekmektedir.

```sh
yarn generate-feature markdown-editor
```

Komutu çalıştırdıktan sonra başarıyla oluşturuldu mesajını görürseniz, `src/features.tsx` dosyasındaki `features` dizisine oluşturduğunuz özelliği ekleyin. Özelliğiniz bu şekilde sol menüde listenecektir ve erişilebilir olacaktır. Sol menüde her özelliğin bir ikonu mevcuttur ve özelliğinize [Tabler Icons](https://tabler-icons.io/)'dan bir ikon seçebilirsiniz.


## 3. Parti Paketler
Farklı lock dosyaları oluşmaması için paket yöneticisi olarak [Yarn](https://yarnpkg.com/) kullanıyoruz. Eğer codebase'e yeni bir npm paketi dahil etmek istiyorsanız dikkat etmeniz gereken 3 madde mevcut:

Bu 3 maddenin öncesinde eğer 3. parti bir paket dahil etmeden de basit bir şekilde aynı işlev sağlanabiliyorsa, ekstra paket yüklemekten kaçınmak faydalı olacak.

1. Proje içerisinde aynı işi yapan farklı bir paket olup olmadığını kontrol edin. Örneğin kod blokları için zaten mevcut olan `ace-editor` paketini kullanın ve `monaco-editor` gibi alternatifleri projeye dahil etmeyin.
2. Dahil etmek istediğiniz 3. parti paketin çalışması için internet erişimi gerektirmediğinden emin olun. Craze offline durumda da çalışabilen bir uygulama olmalıdır.
3. Dahil etmek istediğiniz 3. parti paket için `dependency` ve `devDependency` ayrımını doğru bir şekilde yapın. Craze bir Electron uygulaması olduğu için bu ayrım, eğer daha önce bir Electron uygulaması geliştirmediyseniz size tuhaf gelebilir. Fakat proje, çalıştırılabilir bir uygulamaya dönüştürülürken yapılan build işleminde aslında `devDependency` listesi de uygulama içine dahil edilecektir. Ayrım temelde şu şekilde yapılabilir:


| Sınıflandırma | Örnek 3. parti uygulamalar | dependencies | devDependencies |
|--|--|--|--|
| NodeJS Native Modülleri (C/C++) | serialport, sqlite3 | ✅ | ❌ |
| NodeJS CJM ve ESM Modülleri | bcrypt, execa | ❌ | ✅ |
| Web Modülleri | formik, lodash | ❌ | ✅ |


## Mevcut 3. Parti Yardımcılar

Proje içerisinde mevcut olan bazı 3. parti paketlere aşağıdaki listeden kullanım alanlarıyla birlikte göz atabilirsiniz. Bu liste her zaman güncel olmayabilir, tüm paketlere göz atmak için `develop` branch'indeki `package.json` dosyasına göz atabilirsiniz.

| Paket | Kullanım Yeri |
|--|--|
| [React](https://reactjs.org/) | Render işlemleri, state yönetimi ve component hiyerarşisini kurmak için kullandığımız kütüphanedir. |
| [Zustand](https://github.com/pmndrs/zustand) | Global state yönetimini sağlamak için tercih edilen pakettir. Ayrıca her feature'ın kendine özel bir store dosyası bulunmaktadır ve state yönetimi bu store dosyasından sağlanmaktadır. |
| [Lodash](https://lodash.com/docs/) | Lodash'i bir isveç çakısı olarak adlandırabiliriz. Array, String, Date, Function ve Object işlemleri için yardımcı fonksiyonlar sağlamaktadır. |
| [Formik](https://formik.org/docs/overview) | React bileşenindeki formları yönetmek için Formik kullanabilirsiniz. |
| [Fuse.js](https://fusejs.io/) | Search gerektiren özellikler için Fuse.js kapsamlı bir arama imkanı sağlamaktadır. |
| [Classnames](https://www.npmjs.com/package/classnames) | React bileşeninizde dahil etmek istediğiniz birden fazla stili birleştirmenizi sağlar. Ayrıca şartlı bir şekilde stil de ekleyebilirsiniz. |


## CSS ve UI Kit
Craze içerisinde herhangi bir UI Kit barındırmamaktadır. Stil kısmında ise scoped bir css yazmak için Module.css kullanmaktadır. Bunun yanında kod okunurluğu ve yazım konforunu arttırmak için SCSS ile birlikte kullanılmaktadır. Eğer bir özellik geliştiriyorsanız bu özelliğe ait bir module.scss dosyası olacaktır. Tüm uygulamaya etki etmesi istenen stiller ise `src/assets/styles` içerisinde bulunmaktadır.


## Testing
Proje içerisinde şuanda unit testler mevcuttur ve her geliştirilen feature için minimum bir unit test oluşturulması gerekmektedir. Testler için [Jest](https://jestjs.io/) kütüphanesi kullanılmaktadır. Unit testleri oluşturmak için ChatGPT'den de yardım alabilirsiniz, size başlangıç için birkaç senaryo hazırlayacaktır.

Unit test haricindeki diğer test türleri için de katkı yapabilirsiniz. `tests` klasörü içerisindeki `unit` dizini yanına oluşturmak istediğiniz test türüne özgü bir dizin açarak başlayabilirsiniz. Örneğin: `tests/e2e` dizini oluşturun ve içerisine yeni test dosyalarını aktarın.
