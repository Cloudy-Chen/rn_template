
## 1.实现原理

基于FlatList的下拉刷新，上拉加载的控件。采用了状态模式的设计模式。根据刷新状态更改对应的UI和行为。流程如下：

![avatar](../img/RefreshListView流程图.png)

## 2.接口介绍

| Prop | Type | Description | Default |
| :- | :- | :- | :- |
| refreshState | number | 列表刷新状态：<br/>1、Idle（普通状态）<br/>2、HeaderRefreshing（头部刷新）<br/>3、FooterRefreshing（底部刷新）<br/>4、NoMoreData（已加载全部数据）<br/>5、EmptyData（空数据）<br/>6、Failure（加载失败） | None |
| onHeaderRefresh | (refreshState: number) => void | 下拉刷新回调方法<br/>refreshState参数值为RefreshState.HeaderRefreshing | None |
| onFooterRefresh | (refreshState: number) => void | 上拉翻页回调方法<br/>refreshState参数值为RefreshState.FooterRefreshing | None |
| data | Array | 同FlatList中的data属性 | None |
| footerRefreshingText | ?string | 自定义底部刷新中文字 | '数据加载中…' |
| footerFailureText | ?string | 自定义底部失败文字 | '点击重新加载' |
| footerNoMoreDataText | ?string | 自定义底部已加载全部数据文字 | '已加载全部数据' |
| footerEmptyDataText | ?string | 自定义空数据文字 | '暂时没有相关数据' |
| footerRefreshingComponent | ?any | 自定义底部刷新控件 | null |
| footerFailureComponent | ?any | 自定义底部失败控件 | null |
| footerNoMoreDataComponent | ?any | 自定义底部已加载全部数据控件 | null |
| footerEmptyDataComponent | ?any | 自定义空数据控件 | null |
| renderItem | Function | 对列表中每一行（项）进行渲染 | null |

## 3.使用方式 & 展示

```
<RefreshListView
    data={this.state.dataList}
    keyExtractor={this.keyExtractor}
    renderItem={this.renderCell}

    refreshState={this.state.refreshState}
    onHeaderRefresh={this.onHeaderRefresh}
    onFooterRefresh={this.onFooterRefresh}
/>
```
![avatar](../img/RefreshListView_1.png)
