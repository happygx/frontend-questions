---
level: 0.5
---

# less 文件中怎么使用函数？

## 题目要点

- 利用内置函数进行数学运算、颜色调整、字符串处理等；
- 自定义 Mixin 或者函数来进行动态的样式计算；
- 使用条件语句根据不同的参数选择不同的样式。

## 参考答案

在 `LESS` 中，可以使用函数来进行各种操作，例如数学运算、颜色操作、字符串操作等。LESS 提供了一些内置的函数，可以帮助我们在样式表中动态计算、转换和修改值。还可以自定义函数来完成特定的计算或操作。

### 1. **内置函数**

#### 数学函数

LESS 提供了常见的数学运算函数，比如加、减、乘、除等：

```less
@result: @base + 5; // 15

@width: 50px;
@height: 100px;
@area: @width * @height; // 5000px
```

LESS 提供了许多用于操作颜色的函数，可以调整颜色的亮度、饱和度、透明度等：

- `darken($color, $amount)`：使颜色变暗
- `lighten($color, $amount)`：使颜色变亮
- `saturate($color, $amount)`：增加颜色的饱和度
- `desaturate($color, $amount)`：减少颜色的饱和度
- `adjust-hue($color, $degrees)`：调整颜色的色相
- `rgba($color, $alpha)`：为颜色添加透明度

```less

@lightColor: lighten(@color, 10%); // 更亮的颜色
@darkColor: darken(@color, 10%);   // 更暗的颜色
@semiTransparent: rgba(@color, 0.5); // 半透明的颜色
```

LESS 还提供了一些用于字符串处理的函数：

- `unit($value)`：返回值的单位
- `str-length($string)`：返回字符串的长度
- `str-index($string, $substring)`：返回子字符串的位置
- `to-upper-case($string)`：将字符串转换为大写
- `to-lower-case($string)`：将字符串转换为小写

```less
@stringLength: str-length(@string); // 12

@upper: to-upper-case(@string); // "HELLO, LESS!"
@lower: to-lower-case(@string); // "hello, less!"
```

LESS 提供了内置的 `media()` 函数来定义响应式设计中的媒体查询：

```less

@media-query: media(max-width: @breakpoint);
```

你也可以在 LESS 中定义自己的函数（Mixin），通过参数传递来实现一些动态的样式计算。自定义函数通常用于计算一些动态的值或者重复的样式逻辑。

#### 示例：自定义 Mixin 函数

```less
.rounded(@radius) {
  border-radius: @radius;
}

// 使用该函数
.button {
  .rounded(5px); // 设置圆角为 5px
}
```

```less
.chooseColor(@color) {
  @selectedColor: @color == "primary" ? #3498db :
                  @color == "secondary" ? #2ecc71 :
                  #e74c3c; // 默认红色
  color: @selectedColor;
}

// 使用该函数
.button {
  .chooseColor("primary");  // 使用主色
}
```

```less
.calculatePadding(@padding) {
  padding: @padding * 2; // 将传入的 padding 值翻倍
}

// 使用该函数
.container {
  .calculatePadding(10px); // padding 为 20px
}
```

LESS 支持使用 `@variable` 作为函数的参数，并结合条件语句来动态生成值：

```less

.getFontSize(@size) {
  @calculated-size: @size > 20px ? @size : 20px;
  font-size: @calculated-size;
}

.button {
  .getFontSize(@font-size); // 如果 @font-size 小于 20px，则使用 20px
}
```

在 LESS 中，函数的作用域是局部的，函数内部的变量不会影响外部环境，函数的参数和局部变量只在函数内部有效。

### 总结
