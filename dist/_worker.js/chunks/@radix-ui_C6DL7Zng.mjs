globalThis.process ??= {}; globalThis.process.env ??= {};
import { _ as _extends } from './@babel_Dyv7a1ZZ.mjs';
import { r as reactExports } from './react_BatLIxD_.mjs';
import { u as useFloating, a as autoUpdate, o as offset, s as shift, f as flip, b as size, c as arrow, h as hide, l as limitShift } from './@floating-ui_DzB9HQL2.mjs';
import { r as reactDomExports, $ as $7SXl2$reactdom } from './react-dom_BlIcpVJp.mjs';

function $e42e1063c40fb3ef$export$b9ecd428b558ff10(originalEventHandler, ourEventHandler, { checkForDefaultPrevented: checkForDefaultPrevented = true  } = {}) {
    return function handleEvent(event) {
        originalEventHandler === null || originalEventHandler === void 0 || originalEventHandler(event);
        if (checkForDefaultPrevented === false || !event.defaultPrevented) return ourEventHandler === null || ourEventHandler === void 0 ? void 0 : ourEventHandler(event);
    };
}

/* -------------------------------------------------------------------------------------------------
 * createContextScope
 * -----------------------------------------------------------------------------------------------*/ function $c512c27ab02ef895$export$50c7b4e9d9f19c1(scopeName, createContextScopeDeps = []) {
    let defaultContexts = [];
    /* -----------------------------------------------------------------------------------------------
   * createContext
   * ---------------------------------------------------------------------------------------------*/ function $c512c27ab02ef895$export$fd42f52fd3ae1109(rootComponentName, defaultContext) {
        const BaseContext = /*#__PURE__*/ reactExports.createContext(defaultContext);
        const index = defaultContexts.length;
        defaultContexts = [
            ...defaultContexts,
            defaultContext
        ];
        function Provider(props) {
            const { scope: scope , children: children , ...context } = props;
            const Context = (scope === null || scope === void 0 ? void 0 : scope[scopeName][index]) || BaseContext; // Only re-memoize when prop values change
            // eslint-disable-next-line react-hooks/exhaustive-deps
            const value = reactExports.useMemo(()=>context
            , Object.values(context));
            return /*#__PURE__*/ reactExports.createElement(Context.Provider, {
                value: value
            }, children);
        }
        function useContext(consumerName, scope) {
            const Context = (scope === null || scope === void 0 ? void 0 : scope[scopeName][index]) || BaseContext;
            const context = reactExports.useContext(Context);
            if (context) return context;
            if (defaultContext !== undefined) return defaultContext; // if a defaultContext wasn't specified, it's a required context.
            throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
        }
        Provider.displayName = rootComponentName + 'Provider';
        return [
            Provider,
            useContext
        ];
    }
    /* -----------------------------------------------------------------------------------------------
   * createScope
   * ---------------------------------------------------------------------------------------------*/ const createScope = ()=>{
        const scopeContexts = defaultContexts.map((defaultContext)=>{
            return /*#__PURE__*/ reactExports.createContext(defaultContext);
        });
        return function useScope(scope) {
            const contexts = (scope === null || scope === void 0 ? void 0 : scope[scopeName]) || scopeContexts;
            return reactExports.useMemo(()=>({
                    [`__scope${scopeName}`]: {
                        ...scope,
                        [scopeName]: contexts
                    }
                })
            , [
                scope,
                contexts
            ]);
        };
    };
    createScope.scopeName = scopeName;
    return [
        $c512c27ab02ef895$export$fd42f52fd3ae1109,
        $c512c27ab02ef895$var$composeContextScopes(createScope, ...createContextScopeDeps)
    ];
}
/* -------------------------------------------------------------------------------------------------
 * composeContextScopes
 * -----------------------------------------------------------------------------------------------*/ function $c512c27ab02ef895$var$composeContextScopes(...scopes) {
    const baseScope = scopes[0];
    if (scopes.length === 1) return baseScope;
    const createScope1 = ()=>{
        const scopeHooks = scopes.map((createScope)=>({
                useScope: createScope(),
                scopeName: createScope.scopeName
            })
        );
        return function useComposedScopes(overrideScopes) {
            const nextScopes1 = scopeHooks.reduce((nextScopes, { useScope: useScope , scopeName: scopeName  })=>{
                // We are calling a hook inside a callback which React warns against to avoid inconsistent
                // renders, however, scoping doesn't have render side effects so we ignore the rule.
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const scopeProps = useScope(overrideScopes);
                const currentScope = scopeProps[`__scope${scopeName}`];
                return {
                    ...nextScopes,
                    ...currentScope
                };
            }, {});
            return reactExports.useMemo(()=>({
                    [`__scope${baseScope.scopeName}`]: nextScopes1
                })
            , [
                nextScopes1
            ]);
        };
    };
    createScope1.scopeName = baseScope.scopeName;
    return createScope1;
}

/**
 * A custom hook that converts a callback to a ref to avoid triggering re-renders when passed as a
 * prop or avoid re-executing effects when passed as a dependency
 */ function $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(callback) {
    const callbackRef = reactExports.useRef(callback);
    reactExports.useEffect(()=>{
        callbackRef.current = callback;
    }); // https://github.com/facebook/react/issues/19240
    return reactExports.useMemo(()=>(...args)=>{
            var _callbackRef$current;
            return (_callbackRef$current = callbackRef.current) === null || _callbackRef$current === void 0 ? void 0 : _callbackRef$current.call(callbackRef, ...args);
        }
    , []);
}

function $71cd76cc60e0454e$export$6f32135080cb4c3({ prop: prop , defaultProp: defaultProp , onChange: onChange = ()=>{}  }) {
    const [uncontrolledProp, setUncontrolledProp] = $71cd76cc60e0454e$var$useUncontrolledState({
        defaultProp: defaultProp,
        onChange: onChange
    });
    const isControlled = prop !== undefined;
    const value1 = isControlled ? prop : uncontrolledProp;
    const handleChange = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onChange);
    const setValue = reactExports.useCallback((nextValue)=>{
        if (isControlled) {
            const setter = nextValue;
            const value = typeof nextValue === 'function' ? setter(prop) : nextValue;
            if (value !== prop) handleChange(value);
        } else setUncontrolledProp(nextValue);
    }, [
        isControlled,
        prop,
        setUncontrolledProp,
        handleChange
    ]);
    return [
        value1,
        setValue
    ];
}
function $71cd76cc60e0454e$var$useUncontrolledState({ defaultProp: defaultProp , onChange: onChange  }) {
    const uncontrolledState = reactExports.useState(defaultProp);
    const [value] = uncontrolledState;
    const prevValueRef = reactExports.useRef(value);
    const handleChange = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onChange);
    reactExports.useEffect(()=>{
        if (prevValueRef.current !== value) {
            handleChange(value);
            prevValueRef.current = value;
        }
    }, [
        value,
        prevValueRef,
        handleChange
    ]);
    return uncontrolledState;
}

/**
 * Set a given ref to a given value
 * This utility takes care of different types of refs: callback refs and RefObject(s)
 */ function $6ed0406888f73fc4$var$setRef(ref, value) {
    if (typeof ref === 'function') ref(value);
    else if (ref !== null && ref !== undefined) ref.current = value;
}
/**
 * A utility to compose multiple refs together
 * Accepts callback refs and RefObject(s)
 */ function $6ed0406888f73fc4$export$43e446d32b3d21af(...refs) {
    return (node)=>refs.forEach((ref)=>$6ed0406888f73fc4$var$setRef(ref, node)
        )
    ;
}
/**
 * A custom hook that composes multiple refs
 * Accepts callback refs and RefObject(s)
 */ function $6ed0406888f73fc4$export$c7b2cbe3552a0d05(...refs) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return reactExports.useCallback($6ed0406888f73fc4$export$43e446d32b3d21af(...refs), refs);
}

/* -------------------------------------------------------------------------------------------------
 * Slot
 * -----------------------------------------------------------------------------------------------*/ const $5e63c961fc1ce211$export$8c6ed5c666ac1360 = /*#__PURE__*/ reactExports.forwardRef((props, forwardedRef)=>{
    const { children: children , ...slotProps } = props;
    const childrenArray = reactExports.Children.toArray(children);
    const slottable = childrenArray.find($5e63c961fc1ce211$var$isSlottable);
    if (slottable) {
        // the new element to render is the one passed as a child of `Slottable`
        const newElement = slottable.props.children;
        const newChildren = childrenArray.map((child)=>{
            if (child === slottable) {
                // because the new element will be the one rendered, we are only interested
                // in grabbing its children (`newElement.props.children`)
                if (reactExports.Children.count(newElement) > 1) return reactExports.Children.only(null);
                return /*#__PURE__*/ reactExports.isValidElement(newElement) ? newElement.props.children : null;
            } else return child;
        });
        return /*#__PURE__*/ reactExports.createElement($5e63c961fc1ce211$var$SlotClone, _extends({}, slotProps, {
            ref: forwardedRef
        }), /*#__PURE__*/ reactExports.isValidElement(newElement) ? /*#__PURE__*/ reactExports.cloneElement(newElement, undefined, newChildren) : null);
    }
    return /*#__PURE__*/ reactExports.createElement($5e63c961fc1ce211$var$SlotClone, _extends({}, slotProps, {
        ref: forwardedRef
    }), children);
});
$5e63c961fc1ce211$export$8c6ed5c666ac1360.displayName = 'Slot';
/* -------------------------------------------------------------------------------------------------
 * SlotClone
 * -----------------------------------------------------------------------------------------------*/ const $5e63c961fc1ce211$var$SlotClone = /*#__PURE__*/ reactExports.forwardRef((props, forwardedRef)=>{
    const { children: children , ...slotProps } = props;
    if (/*#__PURE__*/ reactExports.isValidElement(children)) return /*#__PURE__*/ reactExports.cloneElement(children, {
        ...$5e63c961fc1ce211$var$mergeProps(slotProps, children.props),
        ref: forwardedRef ? $6ed0406888f73fc4$export$43e446d32b3d21af(forwardedRef, children.ref) : children.ref
    });
    return reactExports.Children.count(children) > 1 ? reactExports.Children.only(null) : null;
});
$5e63c961fc1ce211$var$SlotClone.displayName = 'SlotClone';
/* -------------------------------------------------------------------------------------------------
 * Slottable
 * -----------------------------------------------------------------------------------------------*/ const $5e63c961fc1ce211$export$d9f1ccf0bdb05d45 = ({ children: children  })=>{
    return /*#__PURE__*/ reactExports.createElement(reactExports.Fragment, null, children);
};
/* ---------------------------------------------------------------------------------------------- */ function $5e63c961fc1ce211$var$isSlottable(child) {
    return /*#__PURE__*/ reactExports.isValidElement(child) && child.type === $5e63c961fc1ce211$export$d9f1ccf0bdb05d45;
}
function $5e63c961fc1ce211$var$mergeProps(slotProps, childProps) {
    // all child props should override
    const overrideProps = {
        ...childProps
    };
    for(const propName in childProps){
        const slotPropValue = slotProps[propName];
        const childPropValue = childProps[propName];
        const isHandler = /^on[A-Z]/.test(propName);
        if (isHandler) {
            // if the handler exists on both, we compose them
            if (slotPropValue && childPropValue) overrideProps[propName] = (...args)=>{
                childPropValue(...args);
                slotPropValue(...args);
            };
            else if (slotPropValue) overrideProps[propName] = slotPropValue;
        } else if (propName === 'style') overrideProps[propName] = {
            ...slotPropValue,
            ...childPropValue
        };
        else if (propName === 'className') overrideProps[propName] = [
            slotPropValue,
            childPropValue
        ].filter(Boolean).join(' ');
    }
    return {
        ...slotProps,
        ...overrideProps
    };
}

const $8927f6f2acc4f386$var$NODES = [
    'a',
    'button',
    'div',
    'form',
    'h2',
    'h3',
    'img',
    'input',
    'label',
    'li',
    'nav',
    'ol',
    'p',
    'span',
    'svg',
    'ul'
]; // Temporary while we await merge of this fix:
// https://github.com/DefinitelyTyped/DefinitelyTyped/pull/55396
// prettier-ignore
/* -------------------------------------------------------------------------------------------------
 * Primitive
 * -----------------------------------------------------------------------------------------------*/ const $8927f6f2acc4f386$export$250ffa63cdc0d034 = $8927f6f2acc4f386$var$NODES.reduce((primitive, node)=>{
    const Node = /*#__PURE__*/ reactExports.forwardRef((props, forwardedRef)=>{
        const { asChild: asChild , ...primitiveProps } = props;
        const Comp = asChild ? $5e63c961fc1ce211$export$8c6ed5c666ac1360 : node;
        reactExports.useEffect(()=>{
            window[Symbol.for('radix-ui')] = true;
        }, []);
        return /*#__PURE__*/ reactExports.createElement(Comp, _extends({}, primitiveProps, {
            ref: forwardedRef
        }));
    });
    Node.displayName = `Primitive.${node}`;
    return {
        ...primitive,
        [node]: Node
    };
}, {});
/* -------------------------------------------------------------------------------------------------
 * Utils
 * -----------------------------------------------------------------------------------------------*/ /**
 * Flush custom event dispatch
 * https://github.com/radix-ui/primitives/pull/1378
 *
 * React batches *all* event handlers since version 18, this introduces certain considerations when using custom event types.
 *
 * Internally, React prioritises events in the following order:
 *  - discrete
 *  - continuous
 *  - default
 *
 * https://github.com/facebook/react/blob/a8a4742f1c54493df00da648a3f9d26e3db9c8b5/packages/react-dom/src/events/ReactDOMEventListener.js#L294-L350
 *
 * `discrete` is an  important distinction as updates within these events are applied immediately.
 * React however, is not able to infer the priority of custom event types due to how they are detected internally.
 * Because of this, it's possible for updates from custom events to be unexpectedly batched when
 * dispatched by another `discrete` event.
 *
 * In order to ensure that updates from custom events are applied predictably, we need to manually flush the batch.
 * This utility should be used when dispatching a custom event from within another `discrete` event, this utility
 * is not nessesary when dispatching known event types, or if dispatching a custom type inside a non-discrete event.
 * For example:
 *
 * dispatching a known click 👎
 * target.dispatchEvent(new Event(‘click’))
 *
 * dispatching a custom type within a non-discrete event 👎
 * onScroll={(event) => event.target.dispatchEvent(new CustomEvent(‘customType’))}
 *
 * dispatching a custom type within a `discrete` event 👍
 * onPointerDown={(event) => dispatchDiscreteCustomEvent(event.target, new CustomEvent(‘customType’))}
 *
 * Note: though React classifies `focus`, `focusin` and `focusout` events as `discrete`, it's  not recommended to use
 * this utility with them. This is because it's possible for those handlers to be called implicitly during render
 * e.g. when focus is within a component as it is unmounted, or when managing focus on mount.
 */ function $8927f6f2acc4f386$export$6d1a0317bde7de7f(target, event) {
    if (target) reactDomExports.flushSync(()=>target.dispatchEvent(event)
    );
}

const $7e8f5cd07187803e$export$21b07c8f274aebd5 = /*#__PURE__*/ reactExports.forwardRef((props, forwardedRef)=>{
    const { children: children , width: width = 10 , height: height = 5 , ...arrowProps } = props;
    return /*#__PURE__*/ reactExports.createElement($8927f6f2acc4f386$export$250ffa63cdc0d034.svg, _extends({}, arrowProps, {
        ref: forwardedRef,
        width: width,
        height: height,
        viewBox: "0 0 30 10",
        preserveAspectRatio: "none"
    }), props.asChild ? children : /*#__PURE__*/ reactExports.createElement("polygon", {
        points: "0,0 30,0 15,10"
    }));
});
/* -----------------------------------------------------------------------------------------------*/ const $7e8f5cd07187803e$export$be92b6f5f03c0fe9 = $7e8f5cd07187803e$export$21b07c8f274aebd5;

/**
 * On the server, React emits a warning when calling `useLayoutEffect`.
 * This is because neither `useLayoutEffect` nor `useEffect` run on the server.
 * We use this safe version which suppresses the warning by replacing it with a noop on the server.
 *
 * See: https://reactjs.org/docs/hooks-reference.html#uselayouteffect
 */ const $9f79659886946c16$export$e5c5a5f917a5871c = Boolean(globalThis === null || globalThis === void 0 ? void 0 : globalThis.document) ? reactExports.useLayoutEffect : ()=>{};

function $db6c3485150b8e66$export$1ab7ae714698c4b8(element) {
    const [size, setSize] = reactExports.useState(undefined);
    $9f79659886946c16$export$e5c5a5f917a5871c(()=>{
        if (element) {
            // provide size as early as possible
            setSize({
                width: element.offsetWidth,
                height: element.offsetHeight
            });
            const resizeObserver = new ResizeObserver((entries)=>{
                if (!Array.isArray(entries)) return;
                 // Since we only observe the one element, we don't need to loop over the
                // array
                if (!entries.length) return;
                const entry = entries[0];
                let width;
                let height;
                if ('borderBoxSize' in entry) {
                    const borderSizeEntry = entry['borderBoxSize']; // iron out differences between browsers
                    const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry;
                    width = borderSize['inlineSize'];
                    height = borderSize['blockSize'];
                } else {
                    // for browsers that don't support `borderBoxSize`
                    // we calculate it ourselves to get the correct border box.
                    width = element.offsetWidth;
                    height = element.offsetHeight;
                }
                setSize({
                    width: width,
                    height: height
                });
            });
            resizeObserver.observe(element, {
                box: 'border-box'
            });
            return ()=>resizeObserver.unobserve(element)
            ;
        } else // We only want to reset to `undefined` when the element becomes `null`,
        // not if it changes to another element.
        setSize(undefined);
    }, [
        element
    ]);
    return size;
}

/* -------------------------------------------------------------------------------------------------
 * Popper
 * -----------------------------------------------------------------------------------------------*/ const $cf1ac5d9fe0e8206$var$POPPER_NAME = 'Popper';
const [$cf1ac5d9fe0e8206$var$createPopperContext, $cf1ac5d9fe0e8206$export$722aac194ae923] = $c512c27ab02ef895$export$50c7b4e9d9f19c1($cf1ac5d9fe0e8206$var$POPPER_NAME);
const [$cf1ac5d9fe0e8206$var$PopperProvider, $cf1ac5d9fe0e8206$var$usePopperContext] = $cf1ac5d9fe0e8206$var$createPopperContext($cf1ac5d9fe0e8206$var$POPPER_NAME);
const $cf1ac5d9fe0e8206$export$badac9ada3a0bdf9 = (props)=>{
    const { __scopePopper: __scopePopper , children: children  } = props;
    const [anchor, setAnchor] = reactExports.useState(null);
    return /*#__PURE__*/ reactExports.createElement($cf1ac5d9fe0e8206$var$PopperProvider, {
        scope: __scopePopper,
        anchor: anchor,
        onAnchorChange: setAnchor
    }, children);
};
/* -------------------------------------------------------------------------------------------------
 * PopperAnchor
 * -----------------------------------------------------------------------------------------------*/ const $cf1ac5d9fe0e8206$var$ANCHOR_NAME = 'PopperAnchor';
const $cf1ac5d9fe0e8206$export$ecd4e1ccab6ed6d = /*#__PURE__*/ reactExports.forwardRef((props, forwardedRef)=>{
    const { __scopePopper: __scopePopper , virtualRef: virtualRef , ...anchorProps } = props;
    const context = $cf1ac5d9fe0e8206$var$usePopperContext($cf1ac5d9fe0e8206$var$ANCHOR_NAME, __scopePopper);
    const ref = reactExports.useRef(null);
    const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, ref);
    reactExports.useEffect(()=>{
        // Consumer can anchor the popper to something that isn't
        // a DOM node e.g. pointer position, so we override the
        // `anchorRef` with their virtual ref in this case.
        context.onAnchorChange((virtualRef === null || virtualRef === void 0 ? void 0 : virtualRef.current) || ref.current);
    });
    return virtualRef ? null : /*#__PURE__*/ reactExports.createElement($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends({}, anchorProps, {
        ref: composedRefs
    }));
});
/* -------------------------------------------------------------------------------------------------
 * PopperContent
 * -----------------------------------------------------------------------------------------------*/ const $cf1ac5d9fe0e8206$var$CONTENT_NAME = 'PopperContent';
const [$cf1ac5d9fe0e8206$var$PopperContentProvider, $cf1ac5d9fe0e8206$var$useContentContext] = $cf1ac5d9fe0e8206$var$createPopperContext($cf1ac5d9fe0e8206$var$CONTENT_NAME);
const $cf1ac5d9fe0e8206$export$bc4ae5855d3c4fc = /*#__PURE__*/ reactExports.forwardRef((props, forwardedRef)=>{
    var _arrowSize$width, _arrowSize$height, _middlewareData$arrow, _middlewareData$arrow2, _middlewareData$arrow3, _middlewareData$trans, _middlewareData$trans2, _middlewareData$hide;
    const { __scopePopper: __scopePopper , side: side = 'bottom' , sideOffset: sideOffset = 0 , align: align = 'center' , alignOffset: alignOffset = 0 , arrowPadding: arrowPadding = 0 , avoidCollisions: avoidCollisions = true , collisionBoundary: collisionBoundary = [] , collisionPadding: collisionPaddingProp = 0 , sticky: sticky = 'partial' , hideWhenDetached: hideWhenDetached = false , updatePositionStrategy: updatePositionStrategy = 'optimized' , onPlaced: onPlaced , ...contentProps } = props;
    const context = $cf1ac5d9fe0e8206$var$usePopperContext($cf1ac5d9fe0e8206$var$CONTENT_NAME, __scopePopper);
    const [content, setContent] = reactExports.useState(null);
    const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, (node)=>setContent(node)
    );
    const [arrow$1, setArrow] = reactExports.useState(null);
    const arrowSize = $db6c3485150b8e66$export$1ab7ae714698c4b8(arrow$1);
    const arrowWidth = (_arrowSize$width = arrowSize === null || arrowSize === void 0 ? void 0 : arrowSize.width) !== null && _arrowSize$width !== void 0 ? _arrowSize$width : 0;
    const arrowHeight = (_arrowSize$height = arrowSize === null || arrowSize === void 0 ? void 0 : arrowSize.height) !== null && _arrowSize$height !== void 0 ? _arrowSize$height : 0;
    const desiredPlacement = side + (align !== 'center' ? '-' + align : '');
    const collisionPadding = typeof collisionPaddingProp === 'number' ? collisionPaddingProp : {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        ...collisionPaddingProp
    };
    const boundary = Array.isArray(collisionBoundary) ? collisionBoundary : [
        collisionBoundary
    ];
    const hasExplicitBoundaries = boundary.length > 0;
    const detectOverflowOptions = {
        padding: collisionPadding,
        boundary: boundary.filter($cf1ac5d9fe0e8206$var$isNotNull),
        // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
        altBoundary: hasExplicitBoundaries
    };
    const { refs: refs , floatingStyles: floatingStyles , placement: placement , isPositioned: isPositioned , middlewareData: middlewareData  } = useFloating({
        // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
        strategy: 'fixed',
        placement: desiredPlacement,
        whileElementsMounted: (...args)=>{
            const cleanup = autoUpdate(...args, {
                animationFrame: updatePositionStrategy === 'always'
            });
            return cleanup;
        },
        elements: {
            reference: context.anchor
        },
        middleware: [
            offset({
                mainAxis: sideOffset + arrowHeight,
                alignmentAxis: alignOffset
            }),
            avoidCollisions && shift({
                mainAxis: true,
                crossAxis: false,
                limiter: sticky === 'partial' ? limitShift() : undefined,
                ...detectOverflowOptions
            }),
            avoidCollisions && flip({
                ...detectOverflowOptions
            }),
            size({
                ...detectOverflowOptions,
                apply: ({ elements: elements , rects: rects , availableWidth: availableWidth , availableHeight: availableHeight  })=>{
                    const { width: anchorWidth , height: anchorHeight  } = rects.reference;
                    const contentStyle = elements.floating.style;
                    contentStyle.setProperty('--radix-popper-available-width', `${availableWidth}px`);
                    contentStyle.setProperty('--radix-popper-available-height', `${availableHeight}px`);
                    contentStyle.setProperty('--radix-popper-anchor-width', `${anchorWidth}px`);
                    contentStyle.setProperty('--radix-popper-anchor-height', `${anchorHeight}px`);
                }
            }),
            arrow$1 && arrow({
                element: arrow$1,
                padding: arrowPadding
            }),
            $cf1ac5d9fe0e8206$var$transformOrigin({
                arrowWidth: arrowWidth,
                arrowHeight: arrowHeight
            }),
            hideWhenDetached && hide({
                strategy: 'referenceHidden',
                ...detectOverflowOptions
            })
        ]
    });
    const [placedSide, placedAlign] = $cf1ac5d9fe0e8206$var$getSideAndAlignFromPlacement(placement);
    const handlePlaced = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onPlaced);
    $9f79659886946c16$export$e5c5a5f917a5871c(()=>{
        if (isPositioned) handlePlaced === null || handlePlaced === void 0 || handlePlaced();
    }, [
        isPositioned,
        handlePlaced
    ]);
    const arrowX = (_middlewareData$arrow = middlewareData.arrow) === null || _middlewareData$arrow === void 0 ? void 0 : _middlewareData$arrow.x;
    const arrowY = (_middlewareData$arrow2 = middlewareData.arrow) === null || _middlewareData$arrow2 === void 0 ? void 0 : _middlewareData$arrow2.y;
    const cannotCenterArrow = ((_middlewareData$arrow3 = middlewareData.arrow) === null || _middlewareData$arrow3 === void 0 ? void 0 : _middlewareData$arrow3.centerOffset) !== 0;
    const [contentZIndex, setContentZIndex] = reactExports.useState();
    $9f79659886946c16$export$e5c5a5f917a5871c(()=>{
        if (content) setContentZIndex(window.getComputedStyle(content).zIndex);
    }, [
        content
    ]);
    return /*#__PURE__*/ reactExports.createElement("div", {
        ref: refs.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
            ...floatingStyles,
            transform: isPositioned ? floatingStyles.transform : 'translate(0, -200%)',
            // keep off the page when measuring
            minWidth: 'max-content',
            zIndex: contentZIndex,
            ['--radix-popper-transform-origin']: [
                (_middlewareData$trans = middlewareData.transformOrigin) === null || _middlewareData$trans === void 0 ? void 0 : _middlewareData$trans.x,
                (_middlewareData$trans2 = middlewareData.transformOrigin) === null || _middlewareData$trans2 === void 0 ? void 0 : _middlewareData$trans2.y
            ].join(' ')
        } // Floating UI interally calculates logical alignment based the `dir` attribute on
        ,
        dir: props.dir
    }, /*#__PURE__*/ reactExports.createElement($cf1ac5d9fe0e8206$var$PopperContentProvider, {
        scope: __scopePopper,
        placedSide: placedSide,
        onArrowChange: setArrow,
        arrowX: arrowX,
        arrowY: arrowY,
        shouldHideArrow: cannotCenterArrow
    }, /*#__PURE__*/ reactExports.createElement($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends({
        "data-side": placedSide,
        "data-align": placedAlign
    }, contentProps, {
        ref: composedRefs,
        style: {
            ...contentProps.style,
            // if the PopperContent hasn't been placed yet (not all measurements done)
            // we prevent animations so that users's animation don't kick in too early referring wrong sides
            animation: !isPositioned ? 'none' : undefined,
            // hide the content if using the hide middleware and should be hidden
            opacity: (_middlewareData$hide = middlewareData.hide) !== null && _middlewareData$hide !== void 0 && _middlewareData$hide.referenceHidden ? 0 : undefined
        }
    }))));
});
/* -------------------------------------------------------------------------------------------------
 * PopperArrow
 * -----------------------------------------------------------------------------------------------*/ const $cf1ac5d9fe0e8206$var$ARROW_NAME = 'PopperArrow';
const $cf1ac5d9fe0e8206$var$OPPOSITE_SIDE = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right'
};
const $cf1ac5d9fe0e8206$export$79d62cd4e10a3fd0 = /*#__PURE__*/ reactExports.forwardRef(function $cf1ac5d9fe0e8206$export$79d62cd4e10a3fd0(props, forwardedRef) {
    const { __scopePopper: __scopePopper , ...arrowProps } = props;
    const contentContext = $cf1ac5d9fe0e8206$var$useContentContext($cf1ac5d9fe0e8206$var$ARROW_NAME, __scopePopper);
    const baseSide = $cf1ac5d9fe0e8206$var$OPPOSITE_SIDE[contentContext.placedSide];
    return(/*#__PURE__*/ // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    reactExports.createElement("span", {
        ref: contentContext.onArrowChange,
        style: {
            position: 'absolute',
            left: contentContext.arrowX,
            top: contentContext.arrowY,
            [baseSide]: 0,
            transformOrigin: {
                top: '',
                right: '0 0',
                bottom: 'center 0',
                left: '100% 0'
            }[contentContext.placedSide],
            transform: {
                top: 'translateY(100%)',
                right: 'translateY(50%) rotate(90deg) translateX(-50%)',
                bottom: `rotate(180deg)`,
                left: 'translateY(50%) rotate(-90deg) translateX(50%)'
            }[contentContext.placedSide],
            visibility: contentContext.shouldHideArrow ? 'hidden' : undefined
        }
    }, /*#__PURE__*/ reactExports.createElement($7e8f5cd07187803e$export$be92b6f5f03c0fe9, _extends({}, arrowProps, {
        ref: forwardedRef,
        style: {
            ...arrowProps.style,
            // ensures the element can be measured correctly (mostly for if SVG)
            display: 'block'
        }
    }))));
});
/*#__PURE__*/ Object.assign($cf1ac5d9fe0e8206$export$79d62cd4e10a3fd0, {
    displayName: $cf1ac5d9fe0e8206$var$ARROW_NAME
});
/* -----------------------------------------------------------------------------------------------*/ function $cf1ac5d9fe0e8206$var$isNotNull(value) {
    return value !== null;
}
const $cf1ac5d9fe0e8206$var$transformOrigin = (options)=>({
        name: 'transformOrigin',
        options: options,
        fn (data) {
            var _middlewareData$arrow4, _middlewareData$arrow5, _middlewareData$arrow6, _middlewareData$arrow7, _middlewareData$arrow8;
            const { placement: placement , rects: rects , middlewareData: middlewareData  } = data;
            const cannotCenterArrow = ((_middlewareData$arrow4 = middlewareData.arrow) === null || _middlewareData$arrow4 === void 0 ? void 0 : _middlewareData$arrow4.centerOffset) !== 0;
            const isArrowHidden = cannotCenterArrow;
            const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
            const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;
            const [placedSide, placedAlign] = $cf1ac5d9fe0e8206$var$getSideAndAlignFromPlacement(placement);
            const noArrowAlign = {
                start: '0%',
                center: '50%',
                end: '100%'
            }[placedAlign];
            const arrowXCenter = ((_middlewareData$arrow5 = (_middlewareData$arrow6 = middlewareData.arrow) === null || _middlewareData$arrow6 === void 0 ? void 0 : _middlewareData$arrow6.x) !== null && _middlewareData$arrow5 !== void 0 ? _middlewareData$arrow5 : 0) + arrowWidth / 2;
            const arrowYCenter = ((_middlewareData$arrow7 = (_middlewareData$arrow8 = middlewareData.arrow) === null || _middlewareData$arrow8 === void 0 ? void 0 : _middlewareData$arrow8.y) !== null && _middlewareData$arrow7 !== void 0 ? _middlewareData$arrow7 : 0) + arrowHeight / 2;
            let x = '';
            let y = '';
            if (placedSide === 'bottom') {
                x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
                y = `${-arrowHeight}px`;
            } else if (placedSide === 'top') {
                x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
                y = `${rects.floating.height + arrowHeight}px`;
            } else if (placedSide === 'right') {
                x = `${-arrowHeight}px`;
                y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
            } else if (placedSide === 'left') {
                x = `${rects.floating.width + arrowHeight}px`;
                y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
            }
            return {
                data: {
                    x: x,
                    y: y
                }
            };
        }
    })
;
function $cf1ac5d9fe0e8206$var$getSideAndAlignFromPlacement(placement) {
    const [side, align = 'center'] = placement.split('-');
    return [
        side,
        align
    ];
}
const $cf1ac5d9fe0e8206$export$be92b6f5f03c0fe9 = $cf1ac5d9fe0e8206$export$badac9ada3a0bdf9;
const $cf1ac5d9fe0e8206$export$b688253958b8dfe7 = $cf1ac5d9fe0e8206$export$ecd4e1ccab6ed6d;
const $cf1ac5d9fe0e8206$export$7c6e2c02157bb7d2 = $cf1ac5d9fe0e8206$export$bc4ae5855d3c4fc;
//# sourceMappingURL=index.mjs.map

const $f1701beae083dbae$export$602eac185826482c = /*#__PURE__*/ reactExports.forwardRef((props, forwardedRef)=>{
    var _globalThis$document;
    const { container: container = globalThis === null || globalThis === void 0 ? void 0 : (_globalThis$document = globalThis.document) === null || _globalThis$document === void 0 ? void 0 : _globalThis$document.body , ...portalProps } = props;
    return container ? /*#__PURE__*/ $7SXl2$reactdom.createPortal(/*#__PURE__*/ reactExports.createElement($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends({}, portalProps, {
        ref: forwardedRef
    })), container) : null;
});

function $fe963b355347cc68$export$3e6543de14f8614f(initialState, machine) {
    return reactExports.useReducer((state, event)=>{
        const nextState = machine[state][event];
        return nextState !== null && nextState !== void 0 ? nextState : state;
    }, initialState);
}


const $921a889cee6df7e8$export$99c2b779aa4e8b8b = (props)=>{
    const { present: present , children: children  } = props;
    const presence = $921a889cee6df7e8$var$usePresence(present);
    const child = typeof children === 'function' ? children({
        present: presence.isPresent
    }) : reactExports.Children.only(children);
    const ref = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(presence.ref, child.ref);
    const forceMount = typeof children === 'function';
    return forceMount || presence.isPresent ? /*#__PURE__*/ reactExports.cloneElement(child, {
        ref: ref
    }) : null;
};
$921a889cee6df7e8$export$99c2b779aa4e8b8b.displayName = 'Presence';
/* -------------------------------------------------------------------------------------------------
 * usePresence
 * -----------------------------------------------------------------------------------------------*/ function $921a889cee6df7e8$var$usePresence(present) {
    const [node1, setNode] = reactExports.useState();
    const stylesRef = reactExports.useRef({});
    const prevPresentRef = reactExports.useRef(present);
    const prevAnimationNameRef = reactExports.useRef('none');
    const initialState = present ? 'mounted' : 'unmounted';
    const [state, send] = $fe963b355347cc68$export$3e6543de14f8614f(initialState, {
        mounted: {
            UNMOUNT: 'unmounted',
            ANIMATION_OUT: 'unmountSuspended'
        },
        unmountSuspended: {
            MOUNT: 'mounted',
            ANIMATION_END: 'unmounted'
        },
        unmounted: {
            MOUNT: 'mounted'
        }
    });
    reactExports.useEffect(()=>{
        const currentAnimationName = $921a889cee6df7e8$var$getAnimationName(stylesRef.current);
        prevAnimationNameRef.current = state === 'mounted' ? currentAnimationName : 'none';
    }, [
        state
    ]);
    $9f79659886946c16$export$e5c5a5f917a5871c(()=>{
        const styles = stylesRef.current;
        const wasPresent = prevPresentRef.current;
        const hasPresentChanged = wasPresent !== present;
        if (hasPresentChanged) {
            const prevAnimationName = prevAnimationNameRef.current;
            const currentAnimationName = $921a889cee6df7e8$var$getAnimationName(styles);
            if (present) send('MOUNT');
            else if (currentAnimationName === 'none' || (styles === null || styles === void 0 ? void 0 : styles.display) === 'none') // If there is no exit animation or the element is hidden, animations won't run
            // so we unmount instantly
            send('UNMOUNT');
            else {
                /**
         * When `present` changes to `false`, we check changes to animation-name to
         * determine whether an animation has started. We chose this approach (reading
         * computed styles) because there is no `animationrun` event and `animationstart`
         * fires after `animation-delay` has expired which would be too late.
         */ const isAnimating = prevAnimationName !== currentAnimationName;
                if (wasPresent && isAnimating) send('ANIMATION_OUT');
                else send('UNMOUNT');
            }
            prevPresentRef.current = present;
        }
    }, [
        present,
        send
    ]);
    $9f79659886946c16$export$e5c5a5f917a5871c(()=>{
        if (node1) {
            /**
       * Triggering an ANIMATION_OUT during an ANIMATION_IN will fire an `animationcancel`
       * event for ANIMATION_IN after we have entered `unmountSuspended` state. So, we
       * make sure we only trigger ANIMATION_END for the currently active animation.
       */ const handleAnimationEnd = (event)=>{
                const currentAnimationName = $921a889cee6df7e8$var$getAnimationName(stylesRef.current);
                const isCurrentAnimation = currentAnimationName.includes(event.animationName);
                if (event.target === node1 && isCurrentAnimation) // With React 18 concurrency this update is applied
                // a frame after the animation ends, creating a flash of visible content.
                // By manually flushing we ensure they sync within a frame, removing the flash.
                reactDomExports.flushSync(()=>send('ANIMATION_END')
                );
            };
            const handleAnimationStart = (event)=>{
                if (event.target === node1) // if animation occurred, store its name as the previous animation.
                prevAnimationNameRef.current = $921a889cee6df7e8$var$getAnimationName(stylesRef.current);
            };
            node1.addEventListener('animationstart', handleAnimationStart);
            node1.addEventListener('animationcancel', handleAnimationEnd);
            node1.addEventListener('animationend', handleAnimationEnd);
            return ()=>{
                node1.removeEventListener('animationstart', handleAnimationStart);
                node1.removeEventListener('animationcancel', handleAnimationEnd);
                node1.removeEventListener('animationend', handleAnimationEnd);
            };
        } else // Transition to the unmounted state if the node is removed prematurely.
        // We avoid doing so during cleanup as the node may change but still exist.
        send('ANIMATION_END');
    }, [
        node1,
        send
    ]);
    return {
        isPresent: [
            'mounted',
            'unmountSuspended'
        ].includes(state),
        ref: reactExports.useCallback((node)=>{
            if (node) stylesRef.current = getComputedStyle(node);
            setNode(node);
        }, [])
    };
}
/* -----------------------------------------------------------------------------------------------*/ function $921a889cee6df7e8$var$getAnimationName(styles) {
    return (styles === null || styles === void 0 ? void 0 : styles.animationName) || 'none';
}

/**
 * Listens for when the escape key is down
 */ function $addc16e1bbe58fd0$export$3a72a57244d6e765(onEscapeKeyDownProp, ownerDocument = globalThis === null || globalThis === void 0 ? void 0 : globalThis.document) {
    const onEscapeKeyDown = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onEscapeKeyDownProp);
    reactExports.useEffect(()=>{
        const handleKeyDown = (event)=>{
            if (event.key === 'Escape') onEscapeKeyDown(event);
        };
        ownerDocument.addEventListener('keydown', handleKeyDown);
        return ()=>ownerDocument.removeEventListener('keydown', handleKeyDown)
        ;
    }, [
        onEscapeKeyDown,
        ownerDocument
    ]);
}

const $5cb92bef7577960e$var$CONTEXT_UPDATE = 'dismissableLayer.update';
const $5cb92bef7577960e$var$POINTER_DOWN_OUTSIDE = 'dismissableLayer.pointerDownOutside';
const $5cb92bef7577960e$var$FOCUS_OUTSIDE = 'dismissableLayer.focusOutside';
let $5cb92bef7577960e$var$originalBodyPointerEvents;
const $5cb92bef7577960e$var$DismissableLayerContext = /*#__PURE__*/ reactExports.createContext({
    layers: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    branches: new Set()
});
const $5cb92bef7577960e$export$177fb62ff3ec1f22 = /*#__PURE__*/ reactExports.forwardRef((props, forwardedRef)=>{
    var _node$ownerDocument;
    const { disableOutsidePointerEvents: disableOutsidePointerEvents = false , onEscapeKeyDown: onEscapeKeyDown , onPointerDownOutside: onPointerDownOutside , onFocusOutside: onFocusOutside , onInteractOutside: onInteractOutside , onDismiss: onDismiss , ...layerProps } = props;
    const context = reactExports.useContext($5cb92bef7577960e$var$DismissableLayerContext);
    const [node1, setNode] = reactExports.useState(null);
    const ownerDocument = (_node$ownerDocument = node1 === null || node1 === void 0 ? void 0 : node1.ownerDocument) !== null && _node$ownerDocument !== void 0 ? _node$ownerDocument : globalThis === null || globalThis === void 0 ? void 0 : globalThis.document;
    const [, force] = reactExports.useState({});
    const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, (node)=>setNode(node)
    );
    const layers = Array.from(context.layers);
    const [highestLayerWithOutsidePointerEventsDisabled] = [
        ...context.layersWithOutsidePointerEventsDisabled
    ].slice(-1); // prettier-ignore
    const highestLayerWithOutsidePointerEventsDisabledIndex = layers.indexOf(highestLayerWithOutsidePointerEventsDisabled); // prettier-ignore
    const index = node1 ? layers.indexOf(node1) : -1;
    const isBodyPointerEventsDisabled = context.layersWithOutsidePointerEventsDisabled.size > 0;
    const isPointerEventsEnabled = index >= highestLayerWithOutsidePointerEventsDisabledIndex;
    const pointerDownOutside = $5cb92bef7577960e$var$usePointerDownOutside((event)=>{
        const target = event.target;
        const isPointerDownOnBranch = [
            ...context.branches
        ].some((branch)=>branch.contains(target)
        );
        if (!isPointerEventsEnabled || isPointerDownOnBranch) return;
        onPointerDownOutside === null || onPointerDownOutside === void 0 || onPointerDownOutside(event);
        onInteractOutside === null || onInteractOutside === void 0 || onInteractOutside(event);
        if (!event.defaultPrevented) onDismiss === null || onDismiss === void 0 || onDismiss();
    }, ownerDocument);
    const focusOutside = $5cb92bef7577960e$var$useFocusOutside((event)=>{
        const target = event.target;
        const isFocusInBranch = [
            ...context.branches
        ].some((branch)=>branch.contains(target)
        );
        if (isFocusInBranch) return;
        onFocusOutside === null || onFocusOutside === void 0 || onFocusOutside(event);
        onInteractOutside === null || onInteractOutside === void 0 || onInteractOutside(event);
        if (!event.defaultPrevented) onDismiss === null || onDismiss === void 0 || onDismiss();
    }, ownerDocument);
    $addc16e1bbe58fd0$export$3a72a57244d6e765((event)=>{
        const isHighestLayer = index === context.layers.size - 1;
        if (!isHighestLayer) return;
        onEscapeKeyDown === null || onEscapeKeyDown === void 0 || onEscapeKeyDown(event);
        if (!event.defaultPrevented && onDismiss) {
            event.preventDefault();
            onDismiss();
        }
    }, ownerDocument);
    reactExports.useEffect(()=>{
        if (!node1) return;
        if (disableOutsidePointerEvents) {
            if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
                $5cb92bef7577960e$var$originalBodyPointerEvents = ownerDocument.body.style.pointerEvents;
                ownerDocument.body.style.pointerEvents = 'none';
            }
            context.layersWithOutsidePointerEventsDisabled.add(node1);
        }
        context.layers.add(node1);
        $5cb92bef7577960e$var$dispatchUpdate();
        return ()=>{
            if (disableOutsidePointerEvents && context.layersWithOutsidePointerEventsDisabled.size === 1) ownerDocument.body.style.pointerEvents = $5cb92bef7577960e$var$originalBodyPointerEvents;
        };
    }, [
        node1,
        ownerDocument,
        disableOutsidePointerEvents,
        context
    ]);
    /**
   * We purposefully prevent combining this effect with the `disableOutsidePointerEvents` effect
   * because a change to `disableOutsidePointerEvents` would remove this layer from the stack
   * and add it to the end again so the layering order wouldn't be _creation order_.
   * We only want them to be removed from context stacks when unmounted.
   */ reactExports.useEffect(()=>{
        return ()=>{
            if (!node1) return;
            context.layers.delete(node1);
            context.layersWithOutsidePointerEventsDisabled.delete(node1);
            $5cb92bef7577960e$var$dispatchUpdate();
        };
    }, [
        node1,
        context
    ]);
    reactExports.useEffect(()=>{
        const handleUpdate = ()=>force({})
        ;
        document.addEventListener($5cb92bef7577960e$var$CONTEXT_UPDATE, handleUpdate);
        return ()=>document.removeEventListener($5cb92bef7577960e$var$CONTEXT_UPDATE, handleUpdate)
        ;
    }, []);
    return /*#__PURE__*/ reactExports.createElement($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends({}, layerProps, {
        ref: composedRefs,
        style: {
            pointerEvents: isBodyPointerEventsDisabled ? isPointerEventsEnabled ? 'auto' : 'none' : undefined,
            ...props.style
        },
        onFocusCapture: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onFocusCapture, focusOutside.onFocusCapture),
        onBlurCapture: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onBlurCapture, focusOutside.onBlurCapture),
        onPointerDownCapture: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onPointerDownCapture, pointerDownOutside.onPointerDownCapture)
    }));
});
/* -----------------------------------------------------------------------------------------------*/ /**
 * Listens for `pointerdown` outside a react subtree. We use `pointerdown` rather than `pointerup`
 * to mimic layer dismissing behaviour present in OS.
 * Returns props to pass to the node we want to check for outside events.
 */ function $5cb92bef7577960e$var$usePointerDownOutside(onPointerDownOutside, ownerDocument = globalThis === null || globalThis === void 0 ? void 0 : globalThis.document) {
    const handlePointerDownOutside = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onPointerDownOutside);
    const isPointerInsideReactTreeRef = reactExports.useRef(false);
    const handleClickRef = reactExports.useRef(()=>{});
    reactExports.useEffect(()=>{
        const handlePointerDown = (event)=>{
            if (event.target && !isPointerInsideReactTreeRef.current) {
                const eventDetail = {
                    originalEvent: event
                };
                function handleAndDispatchPointerDownOutsideEvent() {
                    $5cb92bef7577960e$var$handleAndDispatchCustomEvent($5cb92bef7577960e$var$POINTER_DOWN_OUTSIDE, handlePointerDownOutside, eventDetail, {
                        discrete: true
                    });
                }
                /**
         * On touch devices, we need to wait for a click event because browsers implement
         * a ~350ms delay between the time the user stops touching the display and when the
         * browser executres events. We need to ensure we don't reactivate pointer-events within
         * this timeframe otherwise the browser may execute events that should have been prevented.
         *
         * Additionally, this also lets us deal automatically with cancellations when a click event
         * isn't raised because the page was considered scrolled/drag-scrolled, long-pressed, etc.
         *
         * This is why we also continuously remove the previous listener, because we cannot be
         * certain that it was raised, and therefore cleaned-up.
         */ if (event.pointerType === 'touch') {
                    ownerDocument.removeEventListener('click', handleClickRef.current);
                    handleClickRef.current = handleAndDispatchPointerDownOutsideEvent;
                    ownerDocument.addEventListener('click', handleClickRef.current, {
                        once: true
                    });
                } else handleAndDispatchPointerDownOutsideEvent();
            } else // We need to remove the event listener in case the outside click has been canceled.
            // See: https://github.com/radix-ui/primitives/issues/2171
            ownerDocument.removeEventListener('click', handleClickRef.current);
            isPointerInsideReactTreeRef.current = false;
        };
        /**
     * if this hook executes in a component that mounts via a `pointerdown` event, the event
     * would bubble up to the document and trigger a `pointerDownOutside` event. We avoid
     * this by delaying the event listener registration on the document.
     * This is not React specific, but rather how the DOM works, ie:
     * ```
     * button.addEventListener('pointerdown', () => {
     *   console.log('I will log');
     *   document.addEventListener('pointerdown', () => {
     *     console.log('I will also log');
     *   })
     * });
     */ const timerId = window.setTimeout(()=>{
            ownerDocument.addEventListener('pointerdown', handlePointerDown);
        }, 0);
        return ()=>{
            window.clearTimeout(timerId);
            ownerDocument.removeEventListener('pointerdown', handlePointerDown);
            ownerDocument.removeEventListener('click', handleClickRef.current);
        };
    }, [
        ownerDocument,
        handlePointerDownOutside
    ]);
    return {
        // ensures we check React component tree (not just DOM tree)
        onPointerDownCapture: ()=>isPointerInsideReactTreeRef.current = true
    };
}
/**
 * Listens for when focus happens outside a react subtree.
 * Returns props to pass to the root (node) of the subtree we want to check.
 */ function $5cb92bef7577960e$var$useFocusOutside(onFocusOutside, ownerDocument = globalThis === null || globalThis === void 0 ? void 0 : globalThis.document) {
    const handleFocusOutside = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onFocusOutside);
    const isFocusInsideReactTreeRef = reactExports.useRef(false);
    reactExports.useEffect(()=>{
        const handleFocus = (event)=>{
            if (event.target && !isFocusInsideReactTreeRef.current) {
                const eventDetail = {
                    originalEvent: event
                };
                $5cb92bef7577960e$var$handleAndDispatchCustomEvent($5cb92bef7577960e$var$FOCUS_OUTSIDE, handleFocusOutside, eventDetail, {
                    discrete: false
                });
            }
        };
        ownerDocument.addEventListener('focusin', handleFocus);
        return ()=>ownerDocument.removeEventListener('focusin', handleFocus)
        ;
    }, [
        ownerDocument,
        handleFocusOutside
    ]);
    return {
        onFocusCapture: ()=>isFocusInsideReactTreeRef.current = true
        ,
        onBlurCapture: ()=>isFocusInsideReactTreeRef.current = false
    };
}
function $5cb92bef7577960e$var$dispatchUpdate() {
    const event = new CustomEvent($5cb92bef7577960e$var$CONTEXT_UPDATE);
    document.dispatchEvent(event);
}
function $5cb92bef7577960e$var$handleAndDispatchCustomEvent(name, handler, detail, { discrete: discrete  }) {
    const target = detail.originalEvent.target;
    const event = new CustomEvent(name, {
        bubbles: false,
        cancelable: true,
        detail: detail
    });
    if (handler) target.addEventListener(name, handler, {
        once: true
    });
    if (discrete) $8927f6f2acc4f386$export$6d1a0317bde7de7f(target, event);
    else target.dispatchEvent(event);
}

/* -------------------------------------------------------------------------------------------------
 * HoverCard
 * -----------------------------------------------------------------------------------------------*/ let $cef8881cdc69808e$var$originalBodyUserSelect;
const $cef8881cdc69808e$var$HOVERCARD_NAME = 'HoverCard';
const [$cef8881cdc69808e$var$createHoverCardContext, $cef8881cdc69808e$export$47b6998a836b7260] = $c512c27ab02ef895$export$50c7b4e9d9f19c1($cef8881cdc69808e$var$HOVERCARD_NAME, [
    $cf1ac5d9fe0e8206$export$722aac194ae923
]);
const $cef8881cdc69808e$var$usePopperScope = $cf1ac5d9fe0e8206$export$722aac194ae923();
const [$cef8881cdc69808e$var$HoverCardProvider, $cef8881cdc69808e$var$useHoverCardContext] = $cef8881cdc69808e$var$createHoverCardContext($cef8881cdc69808e$var$HOVERCARD_NAME);
const $cef8881cdc69808e$export$57a077cc9fbe653e = (props)=>{
    const { __scopeHoverCard: __scopeHoverCard , children: children , open: openProp , defaultOpen: defaultOpen , onOpenChange: onOpenChange , openDelay: openDelay = 700 , closeDelay: closeDelay = 300  } = props;
    const popperScope = $cef8881cdc69808e$var$usePopperScope(__scopeHoverCard);
    const openTimerRef = reactExports.useRef(0);
    const closeTimerRef = reactExports.useRef(0);
    const hasSelectionRef = reactExports.useRef(false);
    const isPointerDownOnContentRef = reactExports.useRef(false);
    const [open = false, setOpen] = $71cd76cc60e0454e$export$6f32135080cb4c3({
        prop: openProp,
        defaultProp: defaultOpen,
        onChange: onOpenChange
    });
    const handleOpen = reactExports.useCallback(()=>{
        clearTimeout(closeTimerRef.current);
        openTimerRef.current = window.setTimeout(()=>setOpen(true)
        , openDelay);
    }, [
        openDelay,
        setOpen
    ]);
    const handleClose = reactExports.useCallback(()=>{
        clearTimeout(openTimerRef.current);
        if (!hasSelectionRef.current && !isPointerDownOnContentRef.current) closeTimerRef.current = window.setTimeout(()=>setOpen(false)
        , closeDelay);
    }, [
        closeDelay,
        setOpen
    ]);
    const handleDismiss = reactExports.useCallback(()=>setOpen(false)
    , [
        setOpen
    ]); // cleanup any queued state updates on unmount
    reactExports.useEffect(()=>{
        return ()=>{
            clearTimeout(openTimerRef.current);
            clearTimeout(closeTimerRef.current);
        };
    }, []);
    return /*#__PURE__*/ reactExports.createElement($cef8881cdc69808e$var$HoverCardProvider, {
        scope: __scopeHoverCard,
        open: open,
        onOpenChange: setOpen,
        onOpen: handleOpen,
        onClose: handleClose,
        onDismiss: handleDismiss,
        hasSelectionRef: hasSelectionRef,
        isPointerDownOnContentRef: isPointerDownOnContentRef
    }, /*#__PURE__*/ reactExports.createElement($cf1ac5d9fe0e8206$export$be92b6f5f03c0fe9, popperScope, children));
};
/* -------------------------------------------------------------------------------------------------
 * HoverCardTrigger
 * -----------------------------------------------------------------------------------------------*/ const $cef8881cdc69808e$var$TRIGGER_NAME = 'HoverCardTrigger';
const $cef8881cdc69808e$export$ef9f7fd8e4ba882f = /*#__PURE__*/ reactExports.forwardRef((props, forwardedRef)=>{
    const { __scopeHoverCard: __scopeHoverCard , ...triggerProps } = props;
    const context = $cef8881cdc69808e$var$useHoverCardContext($cef8881cdc69808e$var$TRIGGER_NAME, __scopeHoverCard);
    const popperScope = $cef8881cdc69808e$var$usePopperScope(__scopeHoverCard);
    return /*#__PURE__*/ reactExports.createElement($cf1ac5d9fe0e8206$export$b688253958b8dfe7, _extends({
        asChild: true
    }, popperScope), /*#__PURE__*/ reactExports.createElement($8927f6f2acc4f386$export$250ffa63cdc0d034.a, _extends({
        "data-state": context.open ? 'open' : 'closed'
    }, triggerProps, {
        ref: forwardedRef,
        onPointerEnter: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onPointerEnter, $cef8881cdc69808e$var$excludeTouch(context.onOpen)),
        onPointerLeave: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onPointerLeave, $cef8881cdc69808e$var$excludeTouch(context.onClose)),
        onFocus: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onFocus, context.onOpen),
        onBlur: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onBlur, context.onClose) // prevent focus event on touch devices
        ,
        onTouchStart: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onTouchStart, (event)=>event.preventDefault()
        )
    })));
});
/* -------------------------------------------------------------------------------------------------
 * HoverCardPortal
 * -----------------------------------------------------------------------------------------------*/ const $cef8881cdc69808e$var$PORTAL_NAME = 'HoverCardPortal';
const [$cef8881cdc69808e$var$PortalProvider, $cef8881cdc69808e$var$usePortalContext] = $cef8881cdc69808e$var$createHoverCardContext($cef8881cdc69808e$var$PORTAL_NAME, {
    forceMount: undefined
});
const $cef8881cdc69808e$export$b384c6e0a789f88b = (props)=>{
    const { __scopeHoverCard: __scopeHoverCard , forceMount: forceMount , children: children , container: container  } = props;
    const context = $cef8881cdc69808e$var$useHoverCardContext($cef8881cdc69808e$var$PORTAL_NAME, __scopeHoverCard);
    return /*#__PURE__*/ reactExports.createElement($cef8881cdc69808e$var$PortalProvider, {
        scope: __scopeHoverCard,
        forceMount: forceMount
    }, /*#__PURE__*/ reactExports.createElement($921a889cee6df7e8$export$99c2b779aa4e8b8b, {
        present: forceMount || context.open
    }, /*#__PURE__*/ reactExports.createElement($f1701beae083dbae$export$602eac185826482c, {
        asChild: true,
        container: container
    }, children)));
};
/* -------------------------------------------------------------------------------------------------
 * HoverCardContent
 * -----------------------------------------------------------------------------------------------*/ const $cef8881cdc69808e$var$CONTENT_NAME = 'HoverCardContent';
const $cef8881cdc69808e$export$aa4724a5938c586 = /*#__PURE__*/ reactExports.forwardRef((props, forwardedRef)=>{
    const portalContext = $cef8881cdc69808e$var$usePortalContext($cef8881cdc69808e$var$CONTENT_NAME, props.__scopeHoverCard);
    const { forceMount: forceMount = portalContext.forceMount , ...contentProps } = props;
    const context = $cef8881cdc69808e$var$useHoverCardContext($cef8881cdc69808e$var$CONTENT_NAME, props.__scopeHoverCard);
    return /*#__PURE__*/ reactExports.createElement($921a889cee6df7e8$export$99c2b779aa4e8b8b, {
        present: forceMount || context.open
    }, /*#__PURE__*/ reactExports.createElement($cef8881cdc69808e$var$HoverCardContentImpl, _extends({
        "data-state": context.open ? 'open' : 'closed'
    }, contentProps, {
        onPointerEnter: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onPointerEnter, $cef8881cdc69808e$var$excludeTouch(context.onOpen)),
        onPointerLeave: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onPointerLeave, $cef8881cdc69808e$var$excludeTouch(context.onClose)),
        ref: forwardedRef
    })));
});
/* ---------------------------------------------------------------------------------------------- */ const $cef8881cdc69808e$var$HoverCardContentImpl = /*#__PURE__*/ reactExports.forwardRef((props, forwardedRef)=>{
    const { __scopeHoverCard: __scopeHoverCard , onEscapeKeyDown: onEscapeKeyDown , onPointerDownOutside: onPointerDownOutside , onFocusOutside: onFocusOutside , onInteractOutside: onInteractOutside , ...contentProps } = props;
    const context = $cef8881cdc69808e$var$useHoverCardContext($cef8881cdc69808e$var$CONTENT_NAME, __scopeHoverCard);
    const popperScope = $cef8881cdc69808e$var$usePopperScope(__scopeHoverCard);
    const ref = reactExports.useRef(null);
    const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, ref);
    const [containSelection, setContainSelection] = reactExports.useState(false);
    reactExports.useEffect(()=>{
        if (containSelection) {
            const body = document.body; // Safari requires prefix
            $cef8881cdc69808e$var$originalBodyUserSelect = body.style.userSelect || body.style.webkitUserSelect;
            body.style.userSelect = 'none';
            body.style.webkitUserSelect = 'none';
            return ()=>{
                body.style.userSelect = $cef8881cdc69808e$var$originalBodyUserSelect;
                body.style.webkitUserSelect = $cef8881cdc69808e$var$originalBodyUserSelect;
            };
        }
    }, [
        containSelection
    ]);
    reactExports.useEffect(()=>{
        if (ref.current) {
            const handlePointerUp = ()=>{
                setContainSelection(false);
                context.isPointerDownOnContentRef.current = false; // Delay a frame to ensure we always access the latest selection
                setTimeout(()=>{
                    var _document$getSelectio;
                    const hasSelection = ((_document$getSelectio = document.getSelection()) === null || _document$getSelectio === void 0 ? void 0 : _document$getSelectio.toString()) !== '';
                    if (hasSelection) context.hasSelectionRef.current = true;
                });
            };
            document.addEventListener('pointerup', handlePointerUp);
            return ()=>{
                document.removeEventListener('pointerup', handlePointerUp);
                context.hasSelectionRef.current = false;
                context.isPointerDownOnContentRef.current = false;
            };
        }
    }, [
        context.isPointerDownOnContentRef,
        context.hasSelectionRef
    ]);
    reactExports.useEffect(()=>{
        if (ref.current) {
            const tabbables = $cef8881cdc69808e$var$getTabbableNodes(ref.current);
            tabbables.forEach((tabbable)=>tabbable.setAttribute('tabindex', '-1')
            );
        }
    });
    return /*#__PURE__*/ reactExports.createElement($5cb92bef7577960e$export$177fb62ff3ec1f22, {
        asChild: true,
        disableOutsidePointerEvents: false,
        onInteractOutside: onInteractOutside,
        onEscapeKeyDown: onEscapeKeyDown,
        onPointerDownOutside: onPointerDownOutside,
        onFocusOutside: $e42e1063c40fb3ef$export$b9ecd428b558ff10(onFocusOutside, (event)=>{
            event.preventDefault();
        }),
        onDismiss: context.onDismiss
    }, /*#__PURE__*/ reactExports.createElement($cf1ac5d9fe0e8206$export$7c6e2c02157bb7d2, _extends({}, popperScope, contentProps, {
        onPointerDown: $e42e1063c40fb3ef$export$b9ecd428b558ff10(contentProps.onPointerDown, (event)=>{
            // Contain selection to current layer
            if (event.currentTarget.contains(event.target)) setContainSelection(true);
            context.hasSelectionRef.current = false;
            context.isPointerDownOnContentRef.current = true;
        }),
        ref: composedRefs,
        style: {
            ...contentProps.style,
            userSelect: containSelection ? 'text' : undefined,
            // Safari requires prefix
            WebkitUserSelect: containSelection ? 'text' : undefined,
            '--radix-hover-card-content-transform-origin': 'var(--radix-popper-transform-origin)',
            '--radix-hover-card-content-available-width': 'var(--radix-popper-available-width)',
            '--radix-hover-card-content-available-height': 'var(--radix-popper-available-height)',
            '--radix-hover-card-trigger-width': 'var(--radix-popper-anchor-width)',
            '--radix-hover-card-trigger-height': 'var(--radix-popper-anchor-height)'
        }
    })));
});
/* -----------------------------------------------------------------------------------------------*/ function $cef8881cdc69808e$var$excludeTouch(eventHandler) {
    return (event)=>event.pointerType === 'touch' ? undefined : eventHandler()
    ;
}
/**
 * Returns a list of nodes that can be in the tab sequence.
 * @see: https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker
 */ function $cef8881cdc69808e$var$getTabbableNodes(container) {
    const nodes = [];
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
        acceptNode: (node)=>{
            // `.tabIndex` is not the same as the `tabindex` attribute. It works on the
            // runtime's understanding of tabbability, so this automatically accounts
            // for any kind of element that could be tabbed to.
            return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        }
    });
    while(walker.nextNode())nodes.push(walker.currentNode);
    return nodes;
}
const $cef8881cdc69808e$export$be92b6f5f03c0fe9 = $cef8881cdc69808e$export$57a077cc9fbe653e;
const $cef8881cdc69808e$export$41fb9f06171c75f4 = $cef8881cdc69808e$export$ef9f7fd8e4ba882f;
const $cef8881cdc69808e$export$602eac185826482c = $cef8881cdc69808e$export$b384c6e0a789f88b;
const $cef8881cdc69808e$export$7c6e2c02157bb7d2 = $cef8881cdc69808e$export$aa4724a5938c586;

export { $cef8881cdc69808e$export$be92b6f5f03c0fe9 as $, $cef8881cdc69808e$export$41fb9f06171c75f4 as a, $cef8881cdc69808e$export$602eac185826482c as b, $cef8881cdc69808e$export$7c6e2c02157bb7d2 as c };
