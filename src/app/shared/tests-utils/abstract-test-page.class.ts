import { Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';


/**
 * @author Marcos Vinicius Volpato
 * @version 1.0.0
 */
export abstract class AbstractTestPage<T> {

  // this is used to access the dom object created in the test
  protected fixture: ComponentFixture<T>;

  // The elements objects holds the html elements used in the tests
  elements: {
    [key: string]: HTMLElement | HTMLElement[];
  };

  spies: {
    [key: string]: jasmine.SpyObj<any>;
  };

  constructor(fixture?: ComponentFixture<T>) {
    if (fixture) {
      this.setFixture(fixture);
    }

    this.elements = {};
    this.spies = {};
    this.setSpies();
  }

  public createFixture(componentType: Type<T>) {
    return TestBed.createComponent(componentType);
  }

  public setFixture(fixture: ComponentFixture<T>) {
    this.fixture = fixture;
    this.setElements();
  }

  /**
   * Use addElement and addElements methods to configure the elements object
   * when implements this method
   */
  protected abstract setElements();

  /**
   * Use spyOnClass method to configure the class to be spied
   */
  protected abstract setSpies();

  /**
   * Add a single element in elements object
   * @param selector string, html selector e.g. '.my-class span'
   * @param propName string, optional property name used to retrive the element from elements object
   * @example
   * this.addElement('.my-class span', 'elementLabel');
   */
  protected addElement(selector: string, propName: string = null): void {
    Object.defineProperty(this.elements, propName || selector, {
      get: () => this.query<HTMLElement>(selector),
    });
  }

  /**
   * Add an array of elements in elements object
   * @param selector string, html selector e.g. '.my-class span'
   * @param propName string, optional property name used to retrive the element from elements object
   * @example
   * this.addElement('.my-class span', 'elementsLabel');
   */
  protected addElements(selector: string, propName: string = null): void {
    Object.defineProperty(this.elements, propName || selector, {
      get: () => this.queryAll<HTMLElement>(selector),
    });
  }

  /**
   * Retrives the first html element find using the given selector
   * @param selector string, html selector e.g. '.my-class span'
   */
  private query<T1>(selector: string): T1 {
    return this.fixture ? this.fixture.nativeElement.querySelector(selector) : null;
  }

  /**
   * Retrives all html elements find using the given selector
   * @param selector string, html selector e.g. '.my-class span'
   */
  private queryAll<T1>(selector: string): T1[] {
    return this.fixture ? this.fixture.nativeElement.querySelectorAll(selector) : [];
  }

  protected spyOnClass(classBase, propName: string = null) {
    const methodsNames = Object.getOwnPropertyNames(classBase.prototype).filter(name =>
      (this.isGetter(classBase.prototype, name)
      || this.isFunction(classBase.prototype, name))
      && name !== 'constructor');

    const _propName = propName || classBase.name.charAt(0).toLowerCase() + classBase.name.slice(1);
    this.spies[_propName] = jasmine.createSpyObj(_propName, methodsNames);
  }

  private isGetter = ( x, name ) => ( Object.getOwnPropertyDescriptor( x, name ) || {} ).get;
  private isFunction = ( x, name ) => typeof x[ name ] === 'function';
}
