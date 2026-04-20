---
level: 1
---

# 请补充 objToArray 函数

## 题目要点

**作答思路：**

将一个对象转换为数组，其中每个数组元素都是一个格式化的对象，包含了对象的键、操作和值。

1. **定义类型**：首先，定义了两个类型：`Obj`用于表示对象中的键值对，`FormatItem`用于表示数组中的每个元素，它包含了键、操作和值。
2. **创建函数**：创建一个函数`objToArray`，它接受一个`Record<string, Obj>`类型的对象作为参数。
3. **使用reduce方法**：在`objToArray`函数内部，使用`Object.keys(obj)`获取对象的所有键，然后使用`reduce`方法遍历这些键。
4. **提取操作和值**：在`reduce`方法中，对于每个键，使用`Object.keys(obj[key])[0]`来获取键对应的操作（由于每个键对应的值只有一个操作，所以取第一个键即可），并使用`obj[key][op]`来获取操作对应的值。
5. **添加到数组中**：将提取出的键、操作和值添加到`value`数组中，作为新的`FormatItem`对象。
6. **返回数组**：`reduce`方法遍历完成后，返回包含所有`FormatItem`对象的数组。

## 参考答案

参考答案：

```ts
 * @file objToArray
 *
 * 将对象按照要求转为数组
 * 注意console示例运行结果
 */
type Obj = Record<string, string>;
interface FormatItem {
  key: string;
  op: string;
  value: string;
}

function objToArray(obj: Record<string, Obj>): FormatItem[] {
  return Object.keys(obj).reduce((value: Array<FormatItem>, key: string) => {
    var op: string = Object.keys(obj[key])[0];
    value.push({ key: key, op: op, value: obj[key][op] });
    return value;
  }, []);
}

console.log(
  objToArray({
    key1: {
      op1: "value1",
    },
    key2: {
      op2: "value2",
    },
  })
);
// result示例
// [
//     {key: 'key1', op: 'op1', value: 'value1'},
//     {key: 'key2', op: 'op2', value: 'value2'}
// ]

export default {};
```
