## Melon SVG Icon

This package provides the [Google Material Icons](https://material.io/icons/) packaged as a set of React Components.

### Installation

Install the pacakge in ypur project directory with:

```sh
npm i -S melon-svg-icon
```

### Usage

The import path for each icon component includes the icon name in PascalCase.

For example to use `access alarm` icon component, you should write like this:

```js
import AccessAlarm from 'melon-svg-icon/AccessAlarm';
```

We provide the whole `svg` as a React PureComponent, so you can set all the available props for a `svg` element.

> Note:
>
> if you want to change the icon color, you should set `fill` prop;
>
> if you want to change the icon size, you should set `width` / `height` props;

```js
import AccessAlarm from 'melon-svg-icon/AccessAlarm';
export default () => {
    return (
        <AccessAlarm fill="#000" width={48} height={48} />
    );
}
```

> Note: One Exception is `3d rotation` which is rename to `ThreeDRatation`.

### Examples

All the icons size are very large, so you had better only import those icons you needed. We have two ways to use:

1. We recommend to import icons by this way if your tool chain does not support `tree shaking`:

    ```js
    import AccessAlarm from 'melon-svg-icon/AccessAlarm';
    import ThreeDRatation from 'melon-svg-icon/ThreeDRatation';
    ```

2. You can also import icons from main module if your tool chain is `tree shaking`-supported:

    ```js
    import {AccessAlarm, ThreeDRatation} from 'melon-svg-icon';
    ```

### Meta

We supplies a `icons.json` which lists all the icon names.

### Develop

1. We use this [repo](https://github.com/google/material-design-icons) as svg resource which will installed as a devDependence.
2. Then we use `gulp` find all these svg files and transform them into jsx using [svg-to-jsx](https://github.com/janjakubnanista/svg-to-jsx).
3. Next, wrap the jsx in a `PureComponent`
4. Finally, tranlate all the components generated into es5


### All Icons

---
