import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticlePage } from './article';
import { LPSharedModule } from '../../shared/LPShared.module';

@NgModule({
  declarations: [
    ArticlePage,
  ],
  imports: [
    LPSharedModule,
    IonicPageModule.forChild(ArticlePage),
  ],
})
export class ArticlePageModule {}
