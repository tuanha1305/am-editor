import { Path } from 'sharedb';
import { EditorInterface } from './engine';
import { NodeInterface } from './node';
import { SelectionInterface } from './selection';

export interface Range {
	prototype: RangeInterface;
	new (): RangeInterface;
	/**
	 * 从一个 Point 位置获取 RangeInterface 对象
	 */
	create: (
		editor: EditorInterface,
		doc?: Document,
		point?: { x: number; y: number },
	) => RangeInterface;
	/**
	 * 从 Window 、Selection、Range 中创建 RangeInterface 对象
	 */
	from: (
		editor: EditorInterface,
		win?: Window | globalThis.Selection | globalThis.Range,
	) => RangeInterface | null;
	/**
	 * 从路径转换为光标
	 * @param path
	 * @param context 上下文，默认编辑器节点
	 * @param includeCardCursor 是否还原到卡片两侧光标处，必须保证 参数 path 中包含光标位置信息
	 */
	fromPath(
		path: Path[],
		context?: NodeInterface,
		includeCardCursor?: boolean,
	): RangeInterface;
}

export interface RangeInterface {
	readonly base: globalThis.Range;
	readonly startNode: NodeInterface;
	readonly endNode: NodeInterface;
	readonly commonAncestorNode: NodeInterface;
	readonly startContainer: Node;
	readonly endContainer: Node;
	readonly commonAncestorContainer: Node;
	readonly collapsed: boolean;
	readonly endOffset: number;
	readonly startOffset: number;
	cloneContents(): DocumentFragment;
	deleteContents(): void;
	extractContents(): DocumentFragment;
	getBoundingClientRect(): DOMRect;
	getClientRects(): DOMRectList;
	insertNode(node: Node | NodeInterface): void;
	isPointInRange(node: Node | NodeInterface, offset: number): boolean;
	comparePoint(node: Node | NodeInterface, offset: number): number;
	setEnd(node: Node | NodeInterface, offset: number): void;
	setEndAfter(node: Node | NodeInterface): void;
	setEndBefore(node: Node | NodeInterface): void;
	setStart(node: Node | NodeInterface, offset: number): void;
	setStartAfter(node: Node | NodeInterface): void;
	setStartBefore(node: Node | NodeInterface): void;
	toString(): string;
	toRange(): globalThis.Range;
	collapse(toStart?: boolean): RangeInterface;
	cloneRange(): RangeInterface;
	/**
	 * 选中一个节点
	 * @param node 节点
	 * @param contents 是否只选中内容
	 */
	select(node: NodeInterface | Node, contents?: boolean): RangeInterface;
	/**
	 * 获取光标选中的文本
	 */
	getText(): string | null;
	/**
	 * 获取光标所占的区域
	 */
	getClientRect(): DOMRect;
	/**
	 * 将选择标记从 TextNode 扩大到最近非TextNode节点
	 * range 实质所选择的内容不变
	 */
	enlargeFromTextNode(): RangeInterface;
	/**
	 * 将选择标记从非 TextNode 缩小到TextNode节点上，与 enlargeFromTextNode 相反
	 * range 实质所选择的内容不变
	 */
	shrinkToTextNode(): RangeInterface;
	/**
	 * 扩大边界
	 * <p><strong><span>[123</span>abc]</strong>def</p>
	 * to
	 * <p>[<strong><span>123</span>abc</strong>]def</p>
	 * @param range 选区
	 * @param toBlock 是否扩大到块级节点
	 */
	enlargeToElementNode(toBlock?: boolean): RangeInterface;
	/**
	 * 缩小边界
	 * <body>[<p><strong>123</strong></p>]</body>
	 * to
	 * <body><p><strong>[123]</strong></p></body>
	 */
	shrinkToElementNode(): RangeInterface;
	/**
	 * 创建 selection，通过插入 span 节点标记位置
	 * @param key 可选唯一标识
	 */
	createSelection(key?: string): SelectionInterface;
	/**
	 * 获取子选区集合
	 * @param includeCard 是否包含卡片
	 */
	getSubRanges(includeCard?: boolean): Array<RangeInterface>;

	setOffset(
		node: Node | NodeInterface,
		start: number,
		end: number,
	): RangeInterface;

	findElementsInSimpleRange(): Array<Node>;

	inCard(): boolean;

	getStartOffsetNode(): Node;

	getEndOffsetNode(): Node;

	scrollIntoView(): void;

	scrollRangeIntoView(): void;

	scrollIntoViewIfNeeded(node: NodeInterface, view: NodeInterface): void;
	/**
	 * 是否包含卡片
	 */
	containsCard(): boolean;
	/**
	 * 输入内容时，删除浏览器生成的 BR 标签，对空 block 添加 BR
	 * 删除场景
	 * <p><br />foo</p>
	 * <p>foo<br /></p>
	 * 保留场景
	 * <p><br /><br />foo</p>
	 * <p>foo<br /><br /></p>
	 * <p>foo<br />bar</p>
	 * 添加场景
	 * <p></p>
	 * @param isLeft
	 */
	addOrRemoveBr(isLeft?: boolean): RangeInterface;

	/**
	 * 获取开始位置前的节点
	 * <strong>foo</strong>|bar
	 */
	getPrevNode(): NodeInterface | undefined;

	/**
	 * 获取结束位置后的节点
	 * foo|<strong>bar</strong>
	 */
	getNextNode(): NodeInterface | undefined;
	/**
	 * 深度剪切
	 */
	deepCut(): void;

	/**
	 * 对比两个范围是否相等
	 *范围
	 */
	equal(range: RangeInterface | globalThis.Range): boolean;
	/**
	 * 获取当前选区最近的根节点
	 */
	getRootBlock(): NodeInterface | undefined;
	/**
	 * 获取光标路径
	 * @param includeCardCursor 是否包含卡片两侧光标
	 */
	toPath(includeCardCursor?: boolean): Path[];
}

export const isSelection = (
	param: Window | globalThis.Selection | globalThis.Range,
): param is globalThis.Selection => {
	return (param as globalThis.Selection).getRangeAt !== undefined;
};
export const isRange = (
	param: Window | globalThis.Selection | globalThis.Range,
): param is globalThis.Range => {
	return (param as globalThis.Range).collapsed !== undefined;
};
export const isRangeInterface = (
	selector: NodeInterface | RangeInterface,
): selector is RangeInterface => {
	return !!selector && (<RangeInterface>selector).base !== undefined;
};
